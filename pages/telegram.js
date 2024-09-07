import React from 'react';
import styles from '../styles/earnFollow.module.css';

const TelegramPage = ({ onClose }) => {
  const handleButtonClick = () => {
    window.location.href = 'https://t.me/suprhumanofficial';
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.subscribeBox}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose}>X</button>

        {/* Telegram Icon */}
        <img src="/telegram.svg" alt="Telegram" className={styles.icon} />

        {/* Text Content */}
        <p className={styles.text}>JOIN OUR <br />TELEGRAM CHANNEL</p>

        {/* Check Button */}
        <button className={styles.checkButton} onClick={handleButtonClick}>
          CHECK
        </button>
      </div>
    </div>
  );
};

export default TelegramPage;
