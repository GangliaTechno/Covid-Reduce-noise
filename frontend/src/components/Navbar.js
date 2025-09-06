import React, { useState } from 'react';

const Navbar = ({ currentView, setCurrentView }) => {
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleDownloadModel = async () => {
    try {
      setDownloadLoading(true);
      
      // Create download link for the file in assets folder
      const link = document.createElement('a');
      link.href = '/assets/best_denoiser2.h5';  // Path to file in public/assets/
      link.download = 'best_denoiser2.h5';
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success message
      setTimeout(() => {
        alert('Model download started successfully!');
      }, 500);
      
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleNavigateToPaper = () => {
    window.open('https://doi.org/10.3390/electronics11203375', '_blank');
  };

  const glassButtonStyle = {
    padding: '1rem 1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    color: '#374151',
    marginBottom: '1rem'
  };

  const activeButtonStyle = {
    ...glassButtonStyle,
    background: 'rgba(59, 130, 246, 0.3)',
    border: '1px solid rgba(59, 130, 246, 0.5)',
    color: '#1e40af'
  };

  return (
    <nav style={{
      position: 'fixed',
      left: '2rem',
      top: '2rem',
      zIndex: 1000
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '250px',
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        borderRadius: '16px'
      }}>
        <button 
          style={currentView === 'try-model' ? activeButtonStyle : glassButtonStyle}
          onClick={() => setCurrentView('try-model')}
          onMouseEnter={(e) => {
            if (currentView !== 'try-model') {
              e.target.style.background = 'rgba(255, 255, 255, 0.35)';
              e.target.style.border = '1px solid rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateX(5px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentView !== 'try-model') {
              e.target.style.background = 'rgba(255, 255, 255, 0.25)';
              e.target.style.border = '1px solid rgba(255, 255, 255, 0.18)';
              e.target.style.transform = 'translateX(0)';
              e.target.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
            }
          }}
        >
          🔬 Try The Model Out
        </button>
        
        <button 
          style={glassButtonStyle}
          onClick={handleNavigateToPaper}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.35)';
            e.target.style.border = '1px solid rgba(255, 255, 255, 0.3)';
            e.target.style.transform = 'translateX(5px)';
            e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.25)';
            e.target.style.border = '1px solid rgba(255, 255, 255, 0.18)';
            e.target.style.transform = 'translateX(0)';
            e.target.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
          }}
        >
          📄 Navigate to the Paper
        </button>
        
        <button 
          style={{ 
            ...glassButtonStyle,
            marginBottom: '0', // Remove margin from last button
            opacity: downloadLoading ? 0.6 : 1,
            cursor: downloadLoading ? 'not-allowed' : 'pointer'
          }}
          onClick={handleDownloadModel}
          disabled={downloadLoading}
          onMouseEnter={(e) => {
            if (!downloadLoading) {
              e.target.style.background = 'rgba(255, 255, 255, 0.35)';
              e.target.style.border = '1px solid rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateX(5px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }
          }}
          onMouseLeave={(e) => {
            if (!downloadLoading) {
              e.target.style.background = 'rgba(255, 255, 255, 0.25)';
              e.target.style.border = '1px solid rgba(255, 255, 255, 0.18)';
              e.target.style.transform = 'translateX(0)';
              e.target.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
            }
          }}
        >
          {downloadLoading ? '⏳ Downloading...' : '📥 Download the Model'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
