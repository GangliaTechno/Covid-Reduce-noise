import React, { useState, useEffect } from 'react';
import './styles/Glass.css';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import ModelInfo from './components/ModelInfo';
import TryModel from './components/TryModel';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('info');

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="app">
      <div className="background-gradient"></div>
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="main-content">
        {currentView === 'info' && <ModelInfo />}
        {currentView === 'try-model' && <TryModel />}
      </main>
    </div>
  );
}

export default App;
