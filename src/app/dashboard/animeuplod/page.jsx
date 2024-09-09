"use client";

import { useState } from 'react';

export default function VideoUpload() {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState('');
  const [title, setTitle] = useState(''); // Add state for the title
  const [isLoading, setIsLoading] = useState(false);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      setPreview(URL.createObjectURL(file)); // Generate a preview URL for the video
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video || !title) {
      alert('Please provide both a video file and a title.');
      return;
    }

    setIsLoading(true); // Show loading state

    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', title); // Add the title to the form data

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert('Video uploaded successfully');
        setVideo(null); // Clear the video input
        setPreview(''); // Clear the preview
        setTitle(''); // Clear the title input
      } else {
        alert(`Upload failed: ${data.message}`);
      }
    } catch (error) {
      alert('An error occurred during the upload');
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <div>
      <h2>Upload a Video</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Video Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} // Handle title input change
        />
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="video/*" 
        />
        {preview && <video src={preview} controls width={400} />}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>

    </div>
  );
}