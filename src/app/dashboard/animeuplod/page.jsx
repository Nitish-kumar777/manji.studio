"use client"


import { useState } from 'react';

export default function Home() {
  const [animeTitle, setAnimeTitle] = useState('');
  const [animeCoverImage, setAnimeCoverImage] = useState(null);
  const [animeDetails, setAnimeDetails] = useState(null);
  const [animeEp, setAnimeEp] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('animeTitle', animeTitle);
    formData.append('animeCoverImage', animeCoverImage);
    formData.append('animeDetails', animeDetails);
    formData.append('animeEp', animeEp);

    await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    alert('Files uploaded successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Anime Title"
        value={animeTitle}
        onChange={(e) => setAnimeTitle(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setAnimeCoverImage(e.target.files[0])}
        required
      />
      <input
        type="file"
        accept="text/plain"
        onChange={(e) => setAnimeDetails(e.target.files[0])}
        required
      />
      <input
        type="file"
        accept="video/mp4"
        onChange={(e) => setAnimeEp(e.target.files[0])}
        required
      />
      <button type="submit">Upload</button>
    </form>
  );
}
