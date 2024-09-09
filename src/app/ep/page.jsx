"use client";

import { useEffect, useState } from 'react';
import styles from './VideoList.module.css'; // Import the module CSS

export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchVideos = async (query = '') => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/fetch-videos?title=${query}`);
      const data = await res.json();
      
      if (data.success) {
        setVideos(data.videos);
        console.log(data)
      } else {
        alert('Failed to fetch videos');
      }
    } catch (error) {
      alert('An error occurred while fetching videos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos(searchQuery);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Uploaded Videos</h2>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Search by Anime name and Episode number"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {videos.length > 0 ? (
            <ul className={styles.videoList}>
              {videos.map((video) => (
                <li key={video.public_id} className={styles.videoItem}>
                  <video src={video.secure_url} controls width={400} />
                  <p className={styles.videoTitle}>{video.filename || 'Untitled Video'}</p>
                  <p className={styles.hiddenId}>{video.public_id}</p> {/* Hidden public_id */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No videos found</p>
          )}
        </div>
      )}
    </div>
  );
}
