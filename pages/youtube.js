// youtube.js
import React from "react";
import styles from "../styles/earnFollow.module.css";

const SubscribePage = ({ onClose }) => {
  const handleButtonClick = () => {
    window.location.href = "https://www.example.com"; // Replace with your actual URL
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.subscribeBox}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>

        {/* YouTube Icon */}
        <img src="/youtube.svg" alt="YouTube" className={styles.youtubeIcon} />

        {/* Text Content */}
        <p className={styles.text}>SUBSCRIBE TO OUR YOUTUBE CHANNEL</p>

        {/* Check Button */}
        <button className={styles.checkButton} onClick={handleButtonClick}>
          CHECK
        </button>
      </div>
    </div>
  );
};

export default SubscribePage;
