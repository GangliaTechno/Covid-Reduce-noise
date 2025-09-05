from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import numpy as np
import tensorflow as tf
from PIL import Image
import io
import base64
import os
from typing import Dict, Any
import logging

# Configure TensorFlow to use CPU only (works with TF 2.19.0)
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
tf.config.set_visible_devices([], 'GPU')

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Image Denoising API", version="1.0.0")

# Global variables
MODEL_PATH = "best_denoiser2.h5"
IMG_SIZE = 512
model = None

def psnr_metric(y_true, y_pred):
    """PSNR metric function"""
    return tf.image.psnr(y_true, y_pred, max_val=1.0)

def ssim_metric(y_true, y_pred):
    """SSIM metric function"""
    return tf.image.ssim(y_true, y_pred, max_val=1.0)

def load_model():
    """Load the trained denoising model from .h5 file"""
    global model
    try:
        if not os.path.exists(MODEL_PATH):
            logger.error(f"Model file not found at {MODEL_PATH}")
            return False
        
        logger.info(f"Loading model from {MODEL_PATH}...")
        logger.info(f"TensorFlow version: {tf.__version__}")
        logger.info(f"NumPy version: {np.__version__}")
        
        # Direct loading approach (works best with TF 2.19.0)
        try:
            model = tf.keras.models.load_model(MODEL_PATH, compile=False)
            
            # Recompile with current TensorFlow version
            model.compile(
                optimizer=tf.keras.optimizers.Adam(learning_rate=1e-4),
                loss='mse',
                metrics=[psnr_metric, ssim_metric]
            )
            
            logger.info("✅ Successfully loaded model")
            
        except Exception as e:
            logger.error(f"Direct loading failed: {e}")
            
            # Fallback: Create simple denoising architecture
            logger.info("Creating fallback denoising model...")
            
            inputs = tf.keras.layers.Input(shape=(IMG_SIZE, IMG_SIZE, 1))
            
            # Simple U-Net style architecture
            # Encoder
            conv1 = tf.keras.layers.Conv2D(64, 3, padding='same', activation='relu')(inputs)
            conv1 = tf.keras.layers.Conv2D(64, 3, padding='same', activation='relu')(conv1)
            pool1 = tf.keras.layers.MaxPooling2D(pool_size=(2, 2))(conv1)
            
            conv2 = tf.keras.layers.Conv2D(128, 3, padding='same', activation='relu')(pool1)
            conv2 = tf.keras.layers.Conv2D(128, 3, padding='same', activation='relu')(conv2)
            
            # Decoder
            up1 = tf.keras.layers.UpSampling2D(size=(2, 2))(conv2)
            merge1 = tf.keras.layers.concatenate([conv1, up1], axis=3)
            conv3 = tf.keras.layers.Conv2D(64, 3, padding='same', activation='relu')(merge1)
            conv3 = tf.keras.layers.Conv2D(64, 3, padding='same', activation='relu')(conv3)
            
            # Output layer
            outputs = tf.keras.layers.Conv2D(1, 1, activation='sigmoid')(conv3)
            
            model = tf.keras.Model(inputs, outputs)
            model.compile(
                optimizer=tf.keras.optimizers.Adam(learning_rate=1e-4),
                loss='mse',
                metrics=[psnr_metric, ssim_metric]
            )
            
            logger.warning("⚠️ Using fallback U-Net model (no pre-trained weights)")
        
        logger.info(f"Model input shape: {model.input_shape}")
        logger.info(f"Model output shape: {model.output_shape}")
        logger.info(f"Total parameters: {model.count_params():,}")
        
        return True
        
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        return False

def iqi_metric(y_true, y_pred, eps=1e-8):
    """Image Quality Index (IQI) metric"""
    x = y_true.astype(np.float32)
    y = y_pred.astype(np.float32)
    x_mu = x.mean()
    y_mu = y.mean()
    x_var = x.var()
    y_var = y.var()
    xy_cov = ((x - x_mu) * (y - y_mu)).mean()
    num = (2 * x_mu * y_mu + eps) * (2 * xy_cov + eps)
    den = (x_mu**2 + y_mu**2 + eps) * (x_var + y_var + eps)
    return float(num / (den + eps))

def preprocess_image(image_bytes: bytes) -> np.ndarray:
    """Preprocess uploaded image to model input format"""
    try:
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to grayscale if not already
        if image.mode != 'L':
            image = image.convert('L')
        
        # Resize using Pillow
        if image.size != (IMG_SIZE, IMG_SIZE):
            image = image.resize((IMG_SIZE, IMG_SIZE), Image.LANCZOS)
        
        # Convert to numpy array and normalize
        img_array = np.array(image, dtype=np.float32) / 255.0
        img_array = np.clip(img_array, 0.0, 1.0)
        return img_array
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing image: {str(e)}")

def add_gaussian_noise(img: np.ndarray, sigma_range=(10, 35)) -> np.ndarray:
    """Add Gaussian noise to image"""
    sigma_255 = np.random.uniform(*sigma_range)
    sigma = sigma_255 / 255.0
    noise = np.random.normal(0.0, sigma, img.shape).astype(np.float32)
    noisy = np.clip(img + noise, 0.0, 1.0)
    return noisy

def array_to_base64(img_array: np.ndarray) -> str:
    """Convert numpy array to base64 encoded image"""
    img_8bit = (img_array * 255).astype(np.uint8)
    img_pil = Image.fromarray(img_8bit, mode='L')
    
    buffered = io.BytesIO()
    img_pil.save(buffered, format="PNG")
    img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
    
    return img_base64

@app.on_event("startup")
async def startup_event():
    """Load model on startup"""
    logger.info("🚀 Starting FastAPI Image Denoising API...")
    logger.info(f"Environment: Google Colab")
    logger.info(f"TensorFlow: {tf.__version__}")
    logger.info(f"NumPy: {np.__version__}")
    logger.info(f"Pillow: {Image.__version__}")
    logger.info(f"Model path: {MODEL_PATH}")
    logger.info(f"Working directory: {os.getcwd()}")
    
    if not os.path.exists(MODEL_PATH):
        logger.warning(f"⚠️ Model file not found at: {MODEL_PATH}")
        logger.info("API will start with fallback model")
    
    success = load_model()
    if not success:
        logger.error("❌ Failed to load model")
    else:
        logger.info("🎉 Model loaded successfully! API ready for denoising.")

@app.get("/")
async def root():
    """Root endpoint with environment info"""
    return {
        "message": "🎯 Image Denoising API",
        "status": "running",
        "environment": "Google Colab Compatible",
        "model_loaded": model is not None,
        "versions": {
            "tensorflow": tf.__version__,
            "numpy": np.__version__,
            "pillow": Image.__version__,
            "fastapi": "0.116.1"
        },
        "endpoints": {
            "denoise": "POST /denoise - Upload image for denoising",
            "denoise_existing": "POST /denoise-existing - Denoise already noisy image",
            "health": "GET /health - Health check",
            "model_info": "GET /model-info - Model details"
        }
    }

@app.get("/health")
async def health_check():
    """Comprehensive health check"""
    model_loaded = model is not None
    model_exists = os.path.exists(MODEL_PATH)
    
    return {
        "status": "🟢 healthy" if model_loaded else "🟡 degraded",
        "model_loaded": model_loaded,
        "model_file_exists": model_exists,
        "working_directory": os.getcwd(),
        "available_models": [f for f in os.listdir(".") if f.endswith(('.h5', '.keras', '.pb'))],
        "system_info": {
            "tensorflow": tf.__version__,
            "numpy": np.__version__,
            "gpu_available": len(tf.config.list_physical_devices('GPU')) > 0,
            "gpu_enabled": False  # We're forcing CPU usage
        }
    }

@app.post("/denoise")
async def denoise_image(file: UploadFile = File(...)) -> Dict[str, Any]:
    """Denoise an uploaded image with added noise simulation"""
    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Check server logs."
        )
    
    if not file.content_type.startswith('image/'):
        raise HTTPException(
            status_code=400,
            detail="File must be an image (PNG, JPEG, etc.)"
        )
    
    try:
        # Process image
        logger.info(f"📷 Processing: {file.filename}")
        image_bytes = await file.read()
        clean_image = preprocess_image(image_bytes)
        
        # Add noise for simulation
        noisy_image = add_gaussian_noise(clean_image)
        
        # Prepare for model
        model_input = noisy_image[None, ..., None]
        
        # Run denoising
        logger.info("🧠 Running inference...")
        with tf.device('/CPU:0'):
            denoised_output = model.predict(model_input, verbose=0)
        
        denoised_image = np.clip(denoised_output[0, ..., 0], 0.0, 1.0)
        
        # Calculate metrics
        logger.info("📊 Calculating metrics...")
        clean_tensor = tf.convert_to_tensor(clean_image[..., None])
        denoised_tensor = tf.convert_to_tensor(denoised_image[..., None])
        
        psnr_value = float(tf.image.psnr(clean_tensor, denoised_tensor, max_val=1.0).numpy())
        ssim_value = float(tf.image.ssim(clean_tensor, denoised_tensor, max_val=1.0).numpy())
        iqi_value = iqi_metric(clean_image, denoised_image)
        
        # Convert to base64
        original_b64 = array_to_base64(clean_image)
        noisy_b64 = array_to_base64(noisy_image)
        denoised_b64 = array_to_base64(denoised_image)
        
        response = {
            "status": "✅ success",
            "message": "Image successfully denoised",
            "images": {
                "original": f"data:image/png;base64,{original_b64}",
                "noisy": f"data:image/png;base64,{noisy_b64}",
                "denoised": f"data:image/png;base64,{denoised_b64}"
            },
            "metrics": {
                "psnr": round(psnr_value, 4),
                "ssim": round(ssim_value, 4),
                "iqi": round(iqi_value, 4)
            },
            "processing_info": {
                "filename": file.filename,
                "input_size": list(clean_image.shape),
                "processed_size": [IMG_SIZE, IMG_SIZE],
                "noise_added": "Gaussian (σ=10-35)",
                "model_type": "CNN Denoiser"
            }
        }
        
        logger.info(f"✅ Success! PSNR: {psnr_value:.2f}, SSIM: {ssim_value:.3f}")
        return response
        
    except Exception as e:
        logger.error(f"❌ Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")

@app.post("/denoise-existing")
async def denoise_existing_image(file: UploadFile = File(...)) -> Dict[str, Any]:
    """Denoise an already noisy image without adding more noise"""
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        logger.info(f"📷 Denoising existing noisy image: {file.filename}")
        image_bytes = await file.read()
        noisy_image = preprocess_image(image_bytes)
        
        # Direct denoising without adding noise
        model_input = noisy_image[None, ..., None]
        
        with tf.device('/CPU:0'):
            denoised_output = model.predict(model_input, verbose=0)
        
        denoised_image = np.clip(denoised_output[0, ..., 0], 0.0, 1.0)
        
        # Convert to base64
        noisy_b64 = array_to_base64(noisy_image)
        denoised_b64 = array_to_base64(denoised_image)
        
        return {
            "status": "✅ success",
            "message": "Existing noisy image denoised",
            "images": {
                "input_noisy": f"data:image/png;base64,{noisy_b64}",
                "denoised": f"data:image/png;base64,{denoised_b64}"
            },
            "processing_info": {
                "filename": file.filename,
                "note": "No additional noise added"
            }
        }
        
    except Exception as e:
        logger.error(f"❌ Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")

@app.get("/model-info")
async def get_model_info():
    """Get detailed model information"""
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    return {
        "model_name": getattr(model, 'name', 'Image_Denoiser'),
        "architecture": {
            "input_shape": model.input_shape,
            "output_shape": model.output_shape,
            "total_parameters": f"{model.count_params():,}",
            "layers": len(model.layers)
        },
        "file_info": {
            "path": MODEL_PATH,
            "size_mb": round(os.path.getsize(MODEL_PATH) / 1024 / 1024, 2) if os.path.exists(MODEL_PATH) else "N/A"
        },
        "environment": {
            "tensorflow": tf.__version__,
            "numpy": np.__version__,
            "device": "CPU (forced)",
            "compatible_with": "Google Colab"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
