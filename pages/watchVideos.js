// youtube.js
import React from 'react';
import styles from '../styles/watchVideos.module.css'; // Reuse styles for consistency

const YoutubePage = ({ onClose }) => {
  return (
    <div className={styles.overlay}>  {/* Add overlay styling to make it a pop-up */}
      <div className={styles.youtubeBox}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose}>X</button>
        
        {/* YouTube Icon */}
        <img src="/youtube.svg" alt="YouTube" className={styles.youtubeIcon} />

        {/* YouTube Video */}
        <div className={styles.videoContainer}>
          {/* Replace 'YOUR_VIDEO_ID' with the actual video ID from your database */}
          <iframe
            className={styles.video}
            src={`https://www.youtube.com/embed/YOUR_VIDEO_ID`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Check Button */}
        <button className={styles.checkButton}>CHECK</button>
      </div>
    </div>
  );
};

export default YoutubePage;
