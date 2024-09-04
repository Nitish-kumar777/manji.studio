import AnimePage from '@/components/AnimePage'
import styles from '@/app/page.module.css'
import React from 'react'
import TopAnime from '@/components/Top'
import AnimeSlider from '@/components/AnimeSlider'
import RecommendAnime from '@/components/Recommend'
import AnimeMove from '@/components/AnimeMove'

const page = () => {
  return (
    <>
      <div className={styles.slider}>
        <AnimeSlider/>
      </div>
    <div className={styles.main}>
      <AnimePage/>
      <TopAnime/>
    </div>
    <div className={styles.main2}>
      <RecommendAnime/>
      <AnimeMove/>
    </div>
    </>
  )
}

export default page