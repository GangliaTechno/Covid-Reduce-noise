import React, { useState } from 'react';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');

    const fileChangeHandler = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (validTypes.includes(file.type)) {
                setSelectedFile(file);
                setError('');
            } else {
                setError('Please upload a valid image file (JPEG, PNG, GIF).');
            }
        }
    };

    const uploadFileHandler = () => {
        if (selectedFile) {
            // Logic to upload the file goes here
            console.log('Uploading:', selectedFile);
        }
    };

    return (
        <div className="image-upload">
            <input type="file" accept="image/*" onChange={fileChangeHandler} />
            {error && <p className="error">{error}</p>}
            <button onClick={uploadFileHandler} disabled={!selectedFile}>
                Upload
            </button>
        </div>
    );
};

export default ImageUpload;