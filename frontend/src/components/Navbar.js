import React, { useState } from 'react';

const Navbar = ({ currentView, setCurrentView }) => {
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleDownloadModel = async () => {
    try {
      setDownloadLoading(true);
      
      // Create download link for the file in assets folder
      const link = document.createElement('a');
      link.href = '/assets/best_denoiser2.h5';
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
    padding: '0.875rem 1.25rem',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '12px',
    fontSize: '0.875rem',
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
    marginBottom: '0.75rem',
    minHeight: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  };

  const activeButtonStyle = {
    ...glassButtonStyle,
    background: 'rgba(59, 130, 246, 0.3)',
    border: '1px solid rgba(59, 130, 246, 0.5)',
    color: '#1e40af',
    fontWeight: '600'
  };

  return (
    <nav style={{
      position: 'fixed',
      left: '1.5rem',
      top: '1.5rem',
      zIndex: 1000,
      minWidth: '220px',
      maxWidth: '250px'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '1.5rem',
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
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
              e.target.style.transform = 'translateX(3px)';
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
            e.target.style.transform = 'translateX(3px)';
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
            marginBottom: '0',
            opacity: downloadLoading ? 0.6 : 1,
            cursor: downloadLoading ? 'not-allowed' : 'pointer'
          }}
          onClick={handleDownloadModel}
          disabled={downloadLoading}
          onMouseEnter={(e) => {
            if (!downloadLoading) {
              e.target.style.background = 'rgba(255, 255, 255, 0.35)';
              e.target.style.border = '1px solid rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateX(3px)';
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
