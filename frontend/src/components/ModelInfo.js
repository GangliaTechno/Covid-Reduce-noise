import React, { useEffect, useState } from 'react';
import { getModelInfo } from '../utils/api';

const ModelInfo = () => {
  const [modelInfo, setModelInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModelInfo = async () => {
      try {
        setLoading(true);
        const info = await getModelInfo();
        setModelInfo(info);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch model info:', error);
        setError('Failed to load model information');
        // Set default fallback data
        setModelInfo({
          architecture: {
            total_parameters: 'Unknown',
            input_shape: [null, 512, 512, 1],
            output_shape: [null, 512, 512, 1]
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchModelInfo();
  }, []);

  if (loading) {
    return (
      <div className="content-card glass">
        <div className="loading">Loading model information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-card glass">
        <h1 className="section-title">COVID-19 Lung Image Denoising</h1>
        <p className="section-subtitle">
          Deep Learning-based Medical Image Enhancement for Better Diagnosis
        </p>
        <div className="detail-card glass-dark">
          <div className="detail-text">
            {error}. Using default information.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-card glass">
      <h1 className="section-title">COVID-19 Lung Image Denoising</h1>
      <p className="section-subtitle">
        Deep Learning-based Medical Image Enhancement for Better Diagnosis
      </p>

      <div className="model-details">
        <div className="detail-card glass-dark">
          <div className="detail-icon">🧠</div>
          <div className="detail-title">Architecture</div>
          <div className="detail-text">
            Dual-branch CNN with residual learning
            <br />
            {modelInfo?.architecture?.total_parameters || 'Unknown'} parameters
          </div>
        </div>

        <div className="detail-card glass-dark">
          <div className="detail-icon">📊</div>
          <div className="detail-title">Performance</div>
          <div className="detail-text">
            High PSNR & SSIM values
            <br />
            Excellent noise reduction capability
          </div>
        </div>

        <div className="detail-card glass-dark">
          <div className="detail-icon">⚡</div>
          <div className="detail-title">Speed</div>
          <div className="detail-text">
            Real-time processing
            <br />
            CPU & GPU compatible
          </div>
        </div>

        <div className="detail-card glass-dark">
          <div className="detail-icon">🎯</div>
          <div className="detail-title">Accuracy</div>
          <div className="detail-text">
            State-of-the-art denoising
            <br />
            Preserves critical details
          </div>
        </div>
      </div>

      <div className="detail-card glass-dark">
        <h3 className="detail-title">About This Model</h3>
        <div className="detail-text" style={{ textAlign: 'left', fontSize: '1rem', lineHeight: '1.6' }}>
          <p>
            This deep learning model is specifically designed for denoising COVID-19 lung images, 
            helping medical professionals obtain clearer, more accurate diagnostic images. 
            The model employs a dual-branch architecture that effectively removes various types 
            of noise while preserving important medical features.
          </p>
          <br />
          <p>
            <strong>Key Features:</strong>
          </p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Dual-branch CNN architecture for enhanced performance</li>
            <li>Residual learning for better feature preservation</li>
            <li>Optimized for medical imaging applications</li>
            <li>Real-time processing capabilities</li>
            <li>High-quality image reconstruction</li>
          </ul>
        </div>
      </div>

      {/* Model Info Debug (remove in production) */}
      {modelInfo && (
        <div className="detail-card glass-dark" style={{ marginTop: '2rem' }}>
          <h4 className="detail-title">Model Details</h4>
          <div className="detail-text" style={{ textAlign: 'left', fontSize: '0.9rem' }}>
            <p><strong>Input Shape:</strong> {JSON.stringify(modelInfo.architecture?.input_shape || [null, 512, 512, 1])}</p>
            <p><strong>Output Shape:</strong> {JSON.stringify(modelInfo.architecture?.output_shape || [null, 512, 512, 1])}</p>
            <p><strong>Parameters:</strong> {modelInfo.architecture?.total_parameters || 'Unknown'}</p>
            <p><strong>Layers:</strong> {modelInfo.architecture?.layers || 'Unknown'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelInfo;
