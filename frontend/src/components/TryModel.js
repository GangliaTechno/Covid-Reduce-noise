import React, { useState } from 'react';

const TryModel = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            // Create preview URL
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(file);
            setError(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedImage) return;
        
        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('file', selectedImage); // Changed from 'image' to 'file'
            
            const response = await fetch('https://covid-reduce-noise-backend.onrender.com/denoise', {
                method: 'POST',
                body: formData,
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error processing image:', error);
            setError(`Processing failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
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
    };

    const titleStyle = {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: '#1e40af',
        textAlign: 'center',
        marginBottom: '2rem',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        marginBottom: '2rem'
    };

    const uploadAreaStyle = {
        border: '2px dashed rgba(59, 130, 246, 0.3)',
        borderRadius: '12px',
        padding: '3rem 2rem',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    };

    const uploadTextStyle = {
        color: '#4b5563',
        fontSize: '1.2rem',
        marginBottom: '1rem',
        fontWeight: '500'
    };

    const previewStyle = {
        maxWidth: '100%',
        maxHeight: '300px',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(31, 38, 135, 0.3)',
        margin: '1rem 0'
    };

    const buttonStyle = {
        padding: '1rem 2rem',
        fontSize: '1.1rem',
        fontWeight: '600',
        border: 'none',
        borderRadius: '12px',
        background: loading || !selectedImage
            ? 'rgba(156, 163, 175, 0.5)' 
            : 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
        color: 'white',
        cursor: (loading || !selectedImage) ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        opacity: (loading || !selectedImage) ? 0.7 : 1,
        width: '100%'
    };

    const resultContainerStyle = {
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '2rem',
        marginTop: '2rem',
        boxShadow: '0 4px 16px rgba(31, 38, 135, 0.2)'
    };

    const resultTitleStyle = {
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#1e40af',
        marginBottom: '1.5rem',
        textAlign: 'center'
    };

    const imageGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '1.5rem'
    };

    const imageCardStyle = {
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '1rem',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.1)'
    };

    const metricsStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '1rem',
        background: 'rgba(59, 130, 246, 0.1)',
        padding: '1rem',
        borderRadius: '8px',
        marginTop: '1rem'
    };

    const metricCardStyle = {
        textAlign: 'center',
        padding: '0.5rem'
    };

    const errorStyle = {
        background: 'rgba(239, 68, 68, 0.15)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '8px',
        padding: '1rem',
        color: '#dc2626',
        textAlign: 'center',
        marginTop: '1rem'
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>🔬 Try the COVID-19 Lung Image Denoiser</h2>
            
            <form onSubmit={handleSubmit} style={formStyle}>
                <div 
                    style={uploadAreaStyle}
                    onClick={() => document.getElementById('imageInput').click()}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                    }}
                    onDragLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file && file.type.startsWith('image/')) {
                            setSelectedImage(file);
                            const reader = new FileReader();
                            reader.onload = (e) => setPreviewUrl(e.target.result);
                            reader.readAsDataURL(file);
                            setError(null);
                        }
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    }}
                >
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🫁</div>
                    <div style={uploadTextStyle}>
                        📁 Click to upload or drag & drop your lung image
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                        Supports: JPG, PNG, JPEG (Max 10MB)
                    </div>
                    <input
                        id="imageInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </div>

                {previewUrl && (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                            fontSize: '1.1rem', 
                            color: '#4b5563', 
                            marginBottom: '1rem',
                            fontWeight: '500'
                        }}>
                            📸 Uploaded Image Preview:
                        </div>
                        <img src={previewUrl} alt="Preview" style={previewStyle} />
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={loading || !selectedImage}
                    style={buttonStyle}
                    onMouseEnter={(e) => {
                        if (!loading && selectedImage) {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.4)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!loading && selectedImage) {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
                        }
                    }}
                >
                    {loading ? '⏳ Processing Image...' : '🚀 Denoise Image'}
                </button>
            </form>

            {error && (
                <div style={errorStyle}>
                    ⚠️ {error}
                </div>
            )}
            
            {result && result.status === "✅ success" && (
                <div style={resultContainerStyle}>
                    <h3 style={resultTitleStyle}>
                        ✅ Denoising Results
                    </h3>
                    
                    <div style={imageGridStyle}>
                        <div style={imageCardStyle}>
                            <h4 style={{ 
                                color: '#1e40af', 
                                marginBottom: '0.5rem',
                                fontSize: '1rem',
                                fontWeight: '600'
                            }}>
                                📷 Original
                            </h4>
                            <img 
                                src={result.images.original} 
                                alt="Original" 
                                style={{
                                    width: '100%',
                                    maxHeight: '200px',
                                    objectFit: 'contain',
                                    borderRadius: '8px'
                                }}
                            />
                        </div>
                        
                        <div style={imageCardStyle}>
                            <h4 style={{ 
                                color: '#dc2626', 
                                marginBottom: '0.5rem',
                                fontSize: '1rem',
                                fontWeight: '600'
                            }}>
                                🔊 With Noise
                            </h4>
                            <img 
                                src={result.images.noisy} 
                                alt="Noisy" 
                                style={{
                                    width: '100%',
                                    maxHeight: '200px',
                                    objectFit: 'contain',
                                    borderRadius: '8px'
                                }}
                            />
                        </div>
                        
                        <div style={imageCardStyle}>
                            <h4 style={{ 
                                color: '#059669', 
                                marginBottom: '0.5rem',
                                fontSize: '1rem',
                                fontWeight: '600'
                            }}>
                                ✨ Denoised
                            </h4>
                            <img 
                                src={result.images.denoised} 
                                alt="Denoised" 
                                style={{
                                    width: '100%',
                                    maxHeight: '200px',
                                    objectFit: 'contain',
                                    borderRadius: '8px'
                                }}
                            />
                        </div>
                    </div>

                    {result.metrics && (
                        <div>
                            <h4 style={{ 
                                color: '#1e40af', 
                                marginBottom: '1rem',
                                textAlign: 'center',
                                fontSize: '1.1rem',
                                fontWeight: '600'
                            }}>
                                📊 Quality Metrics
                            </h4>
                            <div style={metricsStyle}>
                                <div style={metricCardStyle}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669' }}>
                                        {result.metrics.psnr}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#4b5563' }}>PSNR (dB)</div>
                                </div>
                                <div style={metricCardStyle}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669' }}>
                                        {result.metrics.ssim}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#4b5563' }}>SSIM</div>
                                </div>
                                <div style={metricCardStyle}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669' }}>
                                        {result.metrics.iqi}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#4b5563' }}>IQI</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {result.processing_info && (
                        <div style={{
                            background: 'rgba(59, 130, 246, 0.05)',
                            padding: '1rem',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            color: '#4b5563',
                            marginTop: '1.5rem'
                        }}>
                            <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1e40af' }}>
                                🔧 Processing Details:
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.5rem 1rem' }}>
                                <span>Model Type:</span>
                                <span>{result.processing_info.model_type}</span>
                                <span>Input Size:</span>
                                <span>{result.processing_info.input_size?.join(' × ')}</span>
                                <span>Processed Size:</span>
                                <span>{result.processing_info.processed_size?.join(' × ')}</span>
                                <span>Noise Added:</span>
                                <span>{result.processing_info.noise_added}</span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TryModel;
