import React from 'react';
import preloaderGif from '../assets/preloader.gif';

const Preloader = () => {
  return (
    <div 
      className="preloader" 
      style={{ 
        backgroundColor: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <img src={preloaderGif} alt="Loading..." />
    </div>
  );
};

export default Preloader;
