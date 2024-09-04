"use client";

import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from 'next/navigation';
import styles from '../styles/AnimeSlider.module.css'; 

const AnimeSlider = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch('https://api.jikan.moe/v4/anime?q=2022&sfw');
        const data = await res.json();
        if (data.data && Array.isArray(data.data)) {
          setAnimeList(data.data.slice(0, 5)); // Limit to 5 items
        }
      } catch (error) {
        console.error('Error fetching anime data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  const handleClick = (id) => {
    router.push(`/anime/${id}`);
  };
  const handleClickWatch = (id) => {
    router.push("/ep");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,      // Auto sliding enabled
    autoplaySpeed: 3000, // Slide change every 3 seconds
    arrows: true,        // Enable previous/next arrows
  };

  return (
    <div className={styles.sliderContainer}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Slider {...settings}>
          {animeList.map((anime) => (
            <div
              key={anime.mal_id}
              className={styles.slide}
              onClick={() => handleClick(anime.mal_id)}
            >
              <div className={styles.imageWrapper}>
                <img 
                  src={anime.images.jpg.image_url} 
                  alt={anime.title} 
                  className={styles.image}
                />
              </div>
              <div className={styles.info}>
                <h3>{anime.title}</h3>
                <button className={styles.watchNowBtn}
                onClick={handleClickWatch}
                >Watch Now</button>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default AnimeSlider;
