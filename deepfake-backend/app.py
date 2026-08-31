from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, File, UploadFile
import numpy as np
import tensorflow as tf
from PIL import Image
import io

# ----------------------------
# Load TFLite Model (once)
# ----------------------------

MODEL_PATH = "models/deepfake_detector_mobile_float32.tflite"

print("🔄 Loading TFLite model...")
interpreter = tf.lite.Interpreter(model_path=MODEL_PATH)
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

print("✅ Model loaded successfully")

# ----------------------------
# FastAPI App
# ----------------------------

app = FastAPI(title="Deepfake Detection API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Helper function
# ----------------------------

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))

    img_array = np.array(img).astype(np.float32)
    img_array = (img_array / 127.5) - 1.0
    img_array = np.expand_dims(img_array, axis=0)

    return img_array


# ----------------------------
# API Endpoint
# ----------------------------

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()

    # Preprocess image
    input_data = preprocess_image(image_bytes)

    # Set tensor
    interpreter.set_tensor(input_details[0]['index'], input_data)

    # Run inference
    interpreter.invoke()

    # Get output
    output = interpreter.get_tensor(output_details[0]['index'])[0][0]

    label = "FAKE" if output > 0.5 else "REAL"
    confidence = float(output if output > 0.5 else (1 - output))

    return {
        "prediction": label,
        "confidence": round(confidence * 100, 2)
    }


@app.get("/")
def home():
    return {"message": "Deepfake Detection API is running"}