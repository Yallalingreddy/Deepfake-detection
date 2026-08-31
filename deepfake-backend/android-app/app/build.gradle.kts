// This is the module-level build.gradle.kts for the DeepfakeTester app.
// If you're dropping these files into an Android Studio "Empty Views Activity"
// template project, merge the `android { }` block additions and the
// `dependencies { }` lines below into your existing app/build.gradle.kts
// instead of replacing the whole file (the template already has plugins{},
// namespace, compileSdk, etc. — you mainly need the two additions marked below).

plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.example.deepfaketester"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.deepfaketester"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }

    // *** ADDITION 1 — required ***
    // Without this, AAPT compresses the .tflite file when packaging the APK,
    // which breaks memory-mapping the model at load time
    // ("ByteBuffer is not a valid direct byte buffer" crash).
    androidResources {
        noCompress += "tflite"
    }
}

dependencies {
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("androidx.activity:activity-ktx:1.9.0")

    // *** ADDITION 2 — required ***
    // LiteRT is the current name for the TensorFlow Lite Android runtime.
    // Same Interpreter API/classes you're already using in benchmark_model,
    // just a renamed Maven package.
    implementation("com.google.ai.edge.litert:litert:2.1.0")
}
