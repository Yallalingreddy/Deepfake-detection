package com.example.deepfaketester

import android.content.res.AssetFileDescriptor
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import org.tensorflow.lite.DataType
import org.tensorflow.lite.Interpreter
import org.tensorflow.lite.Tensor
import java.io.FileInputStream
import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.nio.MappedByteBuffer
import java.nio.channels.FileChannel
import kotlin.math.roundToInt

/**
 * Minimal on-device test harness for the deepfake detector .tflite models.
 *
 * Pick an image -> runs it through whichever model is bundled as
 * assets/model.tflite -> shows REAL/FAKE + confidence.
 *
 * Preprocessing assumption (confirmed by user): MobileNet-style [-1, 1]
 * normalization, i.e. pixel / 127.5 - 1.0.
 * Output assumption: single sigmoid value = probability of FAKE.
 *
 * Handles both float32 models AND fully-quantized (uint8/int8 in/out) models
 * automatically by inspecting the interpreter's tensor metadata at runtime,
 * so you can drop in any of your four .tflite variants without touching code.
 */
class MainActivity : AppCompatActivity() {

    private lateinit var interpreter: Interpreter
    private lateinit var resultText: TextView
    private lateinit var debugText: TextView
    private lateinit var imageView: ImageView

    // Whichever .tflite file you copy into app/src/main/assets/, rename it to
    // exactly this so you don't have to touch the code to swap variants.
    private val modelFile = "model.tflite"

    private val pickImage =
        registerForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
            uri?.let { runInference(it) }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        imageView = findViewById(R.id.imageView)
        resultText = findViewById(R.id.resultText)
        debugText = findViewById(R.id.debugText)
        val pickButton = findViewById<Button>(R.id.pickButton)

        interpreter = Interpreter(loadModelFile())

        val inTensor = interpreter.getInputTensor(0)
        val outTensor = interpreter.getOutputTensor(0)
        debugText.text = "Input: ${inTensor.shape().joinToString(",")} ${inTensor.dataType()}\n" +
            "Output: ${outTensor.shape().joinToString(",")} ${outTensor.dataType()}"

        pickButton.setOnClickListener { pickImage.launch("image/*") }
    }

    private fun loadModelFile(): MappedByteBuffer {
        val afd: AssetFileDescriptor = assets.openFd(modelFile)
        val inputStream = FileInputStream(afd.fileDescriptor)
        val channel = inputStream.channel
        return channel.map(FileChannel.MapMode.READ_ONLY, afd.startOffset, afd.declaredLength)
    }

    private fun runInference(uri: Uri) {
        val bitmap = contentResolver.openInputStream(uri)?.use { BitmapFactory.decodeStream(it) }
            ?: return
        imageView.setImageBitmap(bitmap)

        val inputTensor = interpreter.getInputTensor(0)
        val shape = inputTensor.shape() // expected [1, height, width, 3]
        val height = shape[1]
        val width = shape[2]

        val resized = Bitmap.createScaledBitmap(bitmap, width, height, true)
        val inputBuffer = preprocessImage(resized, inputTensor)

        val outputTensor = interpreter.getOutputTensor(0)
        val outputBuffer = ByteBuffer.allocateDirect(outputTensor.numBytes())
        outputBuffer.order(ByteOrder.nativeOrder())

        interpreter.run(inputBuffer, outputBuffer)

        val fakeProbability = readOutput(outputBuffer, outputTensor)

        resultText.text = if (fakeProbability >= 0.5f) {
            "FAKE — ${"%.1f".format(fakeProbability * 100)}% confidence"
        } else {
            "REAL — ${"%.1f".format((1 - fakeProbability) * 100)}% confidence"
        }
        debugText.text = "${debugText.text}\nRaw sigmoid output: $fakeProbability"
    }

    /** Builds the input ByteBuffer, handling both float32 and quantized (uint8/int8) input tensors. */
    private fun preprocessImage(bitmap: Bitmap, inputTensor: Tensor): ByteBuffer {
        val width = bitmap.width
        val height = bitmap.height
        val dtype = inputTensor.dataType()
        val isQuantized = dtype == DataType.UINT8 || dtype == DataType.INT8
        val bytesPerChannel = if (isQuantized) 1 else 4
        val buffer = ByteBuffer.allocateDirect(1 * width * height * 3 * bytesPerChannel)
        buffer.order(ByteOrder.nativeOrder())

        val pixels = IntArray(width * height)
        bitmap.getPixels(pixels, 0, width, 0, 0, width, height)

        val quantParams = if (isQuantized) inputTensor.quantizationParams() else null
        val scale = quantParams?.scale ?: 1f
        val zeroPoint = quantParams?.zeroPoint ?: 0
        val signed = dtype == DataType.INT8

        for (pixel in pixels) {
            val r = (pixel shr 16) and 0xFF
            val g = (pixel shr 8) and 0xFF
            val b = pixel and 0xFF

            // MobileNet-style normalization: value in [-1, 1]
            val rNorm = r / 127.5f - 1f
            val gNorm = g / 127.5f - 1f
            val bNorm = b / 127.5f - 1f

            if (isQuantized) {
                buffer.put(quantize(rNorm, scale, zeroPoint, signed))
                buffer.put(quantize(gNorm, scale, zeroPoint, signed))
                buffer.put(quantize(bNorm, scale, zeroPoint, signed))
            } else {
                buffer.putFloat(rNorm)
                buffer.putFloat(gNorm)
                buffer.putFloat(bNorm)
            }
        }
        buffer.rewind()
        return buffer
    }

    private fun quantize(value: Float, scale: Float, zeroPoint: Int, signed: Boolean): Byte {
        val q = (value / scale + zeroPoint).roundToInt()
        val clamped = if (signed) q.coerceIn(-128, 127) else q.coerceIn(0, 255)
        return clamped.toByte()
    }

    /** Reads the single output value, handling both float32 and quantized (uint8/int8) output tensors. */
    private fun readOutput(buffer: ByteBuffer, outputTensor: Tensor): Float {
        buffer.rewind()
        return when (outputTensor.dataType()) {
            DataType.FLOAT32 -> buffer.float
            DataType.UINT8 -> {
                val raw = buffer.get().toInt() and 0xFF
                val p = outputTensor.quantizationParams()
                (raw - p.zeroPoint) * p.scale
            }
            DataType.INT8 -> {
                val raw = buffer.get().toInt() // Kotlin Byte.toInt() sign-extends, giving -128..127
                val p = outputTensor.quantizationParams()
                (raw - p.zeroPoint) * p.scale
            }
            else -> throw IllegalStateException("Unexpected output dtype: ${outputTensor.dataType()}")
        }
    }
}
