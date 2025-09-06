import React, { useState } from 'react';

const TryModel = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

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
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedImage) return;
        
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', selectedImage);
            
            const response = await fetch('/api/process-model', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error processing model:', error);
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        marginLeft: '320px', // Space for the fixed left navbar
        padding: '3rem 2rem',
        minHeight: '100vh',
        backgroundColor: 'rgba(248, 250, 252, 0.8)'
    };

    const glassCardStyle = {
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto'
    };

    const titleStyle = {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        marginBottom: '2rem'
    };

    const uploadAreaStyle = {
        border: '2px dashed rgba(102, 126, 234, 0.3)',
        borderRadius: '12px',
        padding: '2rem',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    };

    const fileInputStyle = {
        display: 'none'
    };

    const uploadTextStyle = {
        color: '#6b7280',
        fontSize: '1.1rem',
        marginBottom: '1rem'
    };

    const previewStyle = {
        maxWidth: '100%',
        maxHeight: '300px',
        borderRadius: '8px',
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
            ? 'rgba(156, 163, 175, 0.3)' 
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        cursor: (loading || !selectedImage) ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        opacity: (loading || !selectedImage) ? 0.7 : 1
    };

    const resultContainerStyle = {
        background: 'rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginTop: '2rem',
        boxShadow: '0 6px 20px rgba(31, 38, 135, 0.2)'
    };

    const resultTitleStyle = {
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    const resultImageStyle = {
        maxWidth: '100%',
        maxHeight: '400px',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(31, 38, 135, 0.3)',
        margin: '1rem 0'
    };

    return (
        <div style={containerStyle}>
            <div style={glassCardStyle}>
                <h2 style={titleStyle}>🔬 Try the Model</h2>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <div 
                        style={uploadAreaStyle}
                        onClick={() => document.getElementById('imageInput').click()}
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.6)';
                            e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
                        }}
                        onDragLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files[0];
                            if (file && file.type.startsWith('image/')) {
                                setSelectedImage(file);
                                const reader = new FileReader();
                                reader.onload = (e) => setPreviewUrl(e.target.result);
                                reader.readAsDataURL(file);
                            }
                        }}
                    >
                        <div style={uploadTextStyle}>
                            📁 Click to upload or drag & drop your medical image
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
                            Supports: JPG, PNG, JPEG (Max 10MB)
                        </div>
                        <input
                            id="imageInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={fileInputStyle}
                        />
                    </div>

                    {previewUrl && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                                📸 Preview:
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
                                e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading && selectedImage) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                            }
                        }}
                    >
                        {loading ? '⏳ Processing Image...' : '🚀 Denoise Image'}
                    </button>
                </form>
                
                {result && (
                    <div style={resultContainerStyle}>
                        <h3 style={resultTitleStyle}>
                            ✅ Denoised Result:
                        </h3>
                        {result.processedImageUrl && (
                            <div style={{ textAlign: 'center' }}>
                                <img 
                                    src={result.processedImageUrl} 
                                    alt="Denoised Result" 
                                    style={resultImageStyle} 
                                />
                            </div>
                        )}
                        {result.metadata && (
                            <div style={{
                                background: 'rgba(0, 0, 0, 0.05)',
                                padding: '1rem',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                color: '#374151',
                                marginTop: '1rem'
                            }}>
                                <strong>Processing Details:</strong>
                                <pre>{JSON.stringify(result.metadata, null, 2)}</pre>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TryModel;
