const API_BASE_URL = 'https://covid-reduce-noise-backend.onrender.com';

// Helper function for making requests
const makeRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getModelInfo = async () => {
  try {
    const response = await makeRequest(`${API_BASE_URL}/model-info`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch model info:', error);
    throw error;
  }
};

export const denoiseImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await makeRequest(`${API_BASE_URL}/denoise`, {
      method: 'POST',
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.error('Failed to denoise image:', error);
    throw error;
  }
};

// Add the missing downloadModel function
export const downloadModel = async () => {
  try {
    const response = await makeRequest(`${API_BASE_URL}/health`);
    const healthData = await response.json();
    
    // Create download link
    const link = document.createElement('a');
    link.href = `${API_BASE_URL}/download-model`; // You'll need to add this endpoint to your backend
    link.download = 'best_denoiser2.h5';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Download initiated');
  } catch (error) {
    console.error('Download failed:', error);
    // Fallback: open in new tab
    window.open(`${API_BASE_URL}/health`, '_blank');
    throw error;
  }
};

// Legacy function names for compatibility
export const fetchModelData = getModelInfo;
export const getResults = denoiseImage;
export const uploadImage = denoiseImage;
