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
        // Set default fallback data for ONNX model
        setModelInfo({
          model_name: 'Dual-Branch Denoiser (ONNX)',
          model_type: 'ONNX Runtime',
          input_info: { shape: [1, 512, 512, 1] },
          output_info: { shape: [1, 512, 512, 1] },
          providers: ['CPUExecutionProvider']
        });
      } finally {
        setLoading(false);
      }
    };

    fetchModelInfo();
  }, []);

  if (loading) {
    return (
      <div style={{
        marginLeft: '300px',
        marginTop: '2rem',
        marginRight: '2rem',
        marginBottom: '2rem',
        padding: '3rem',
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        borderRadius: '16px',
        color: '#374151',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        <div style={{ fontSize: '1.2rem', color: '#6b7280' }}>
          Loading model information...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        marginLeft: '300px',
        marginTop: '2rem',
        marginRight: '2rem',
        marginBottom: '2rem',
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        borderRadius: '16px',
        color: '#374151',
        minHeight: 'calc(100vh - 4rem)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#1e40af',
          textAlign: 'center',
          marginBottom: '0.5rem',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          COVID-19 Lung Image Denoising
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#6b7280',
          textAlign: 'center',
          marginBottom: '2rem',
          fontWeight: '400'
        }}>
          Deep Learning-based Medical Image Enhancement for Better Diagnosis
        </p>
        <div style={{
          background: 'rgba(239, 68, 68, 0.15)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{ color: '#dc2626', fontSize: '1rem' }}>
            ⚠️ {error}. Using default information.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      marginLeft: '300px',
      marginTop: '2rem',
      marginRight: '2rem',
      marginBottom: '2rem',
      padding: '2rem',
      background: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      borderRadius: '16px',
      color: '#374151',
      minHeight: 'calc(100vh - 4rem)'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: '700',
        color: '#1e40af',
        textAlign: 'center',
        marginBottom: '0.5rem',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        COVID-19 Lung Image Denoising
      </h1>
      
      <p style={{
        fontSize: '1.2rem',
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: '2rem',
        fontWeight: '400'
      }}>
        Deep Learning-based Medical Image Enhancement for Better Diagnosis
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
            margin: '1rem 0',
            transition: 'all 0.3s ease',
            textAlign: 'center',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(31, 38, 135, 0.2)';
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🧠</div>
          <div style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600', 
            color: '#1e40af', 
            marginBottom: '0.5rem' 
          }}>
            Architecture
          </div>
          <div style={{ fontSize: '0.9rem', color: '#4b5563' }}>
            {modelInfo?.model_name || 'Dual-branch CNN'} with residual learning
            <br />
            <strong>{modelInfo?.model_type || 'ONNX Runtime'}</strong>
          </div>
        </div>

        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
            margin: '1rem 0',
            transition: 'all 0.3s ease',
            textAlign: 'center',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(31, 38, 135, 0.2)';
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
          <div style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600', 
            color: '#1e40af', 
            marginBottom: '0.5rem' 
          }}>
            Performance
          </div>
          <div style={{ fontSize: '0.9rem', color: '#4b5563' }}>
            High PSNR & SSIM values
            <br />
            <strong>Excellent noise reduction</strong>
          </div>
        </div>

        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
            margin: '1rem 0',
            transition: 'all 0.3s ease',
            textAlign: 'center',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(31, 38, 135, 0.2)';
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
          <div style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600', 
            color: '#1e40af', 
            marginBottom: '0.5rem' 
          }}>
            Speed
          </div>
          <div style={{ fontSize: '0.9rem', color: '#4b5563' }}>
            Real-time processing
            <br />
            <strong>{modelInfo?.providers?.[0] || 'CPU'} optimized</strong>
          </div>
        </div>

        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
            margin: '1rem 0',
            transition: 'all 0.3s ease',
            textAlign: 'center',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(31, 38, 135, 0.2)';
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
          <div style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600', 
            color: '#1e40af', 
            marginBottom: '0.5rem' 
          }}>
            Accuracy
          </div>
          <div style={{ fontSize: '0.9rem', color: '#4b5563' }}>
            State-of-the-art denoising
            <br />
            <strong>Preserves critical details</strong>
          </div>
        </div>
      </div>

      <div 
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
          borderRadius: '12px',
          padding: '1.5rem',
          margin: '1rem 0',
          transition: 'all 0.3s ease',
          cursor: 'default'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(31, 38, 135, 0.2)';
        }}
      >
        <h3 style={{ 
          fontSize: '1.1rem', 
          fontWeight: '600', 
          color: '#1e40af', 
          marginBottom: '1rem' 
        }}>
          📖 About This Model
        </h3>
        <div style={{ 
          fontSize: '1rem', 
          lineHeight: '1.6',
          textAlign: 'left',
          color: '#4b5563'
        }}>
          <p style={{ marginBottom: '1rem' }}>
            This deep learning model is specifically designed for denoising COVID-19 lung images, 
            helping medical professionals obtain clearer, more accurate diagnostic images. 
            The model employs a dual-branch architecture that effectively removes various types 
            of noise while preserving important medical features.
          </p>
          
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>🔑 Key Features:</strong>
          </p>
          <ul style={{ 
            marginLeft: '1.5rem', 
            marginBottom: '0',
            color: '#4b5563'
          }}>
            <li>Dual-branch CNN architecture for enhanced performance</li>
            <li>Residual learning for better feature preservation</li>
            <li>Optimized for medical imaging applications</li>
            <li>Real-time processing capabilities</li>
            <li>High-quality image reconstruction</li>
          </ul>
        </div>
      </div>

      {/* Technical Details */}
      {modelInfo && (
        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
            margin: '1rem 0',
            transition: 'all 0.3s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(31, 38, 135, 0.2)';
          }}
        >
          <h4 style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600', 
            color: '#1e40af', 
            marginBottom: '1rem' 
          }}>
            🔧 Technical Specifications
          </h4>
          <div style={{ 
            fontSize: '0.9rem',
            textAlign: 'left',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
            color: '#4b5563'
          }}>
            <div>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>📥 Input Shape:</strong><br />
                {JSON.stringify(modelInfo.input_info?.shape || [1, 512, 512, 1])}
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>📤 Output Shape:</strong><br />
                {JSON.stringify(modelInfo.output_info?.shape || [1, 512, 512, 1])}
              </p>
            </div>
            <div>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>🚀 Runtime:</strong><br />
                {modelInfo.onnx_version ? `ONNX Runtime ${modelInfo.onnx_version}` : 'ONNX Runtime'}
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>💻 Providers:</strong><br />
                {modelInfo.providers?.join(', ') || 'CPUExecutionProvider'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelInfo;
