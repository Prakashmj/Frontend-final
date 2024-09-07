import React from "react";
import styles from "../styles/earnFollow.module.css";

const TwitterPage = ({ onClose }) => {
  const handleButtonClick = () => {
    window.location.href = "https://x.com/suprhumangame?s=21";
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.subscribeBox}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>

        {/* Twitter Icon */}
        <img src="/twitter.svg" alt="Twitter" className={styles.icon} />

        {/* Text Content */}
        <p className={styles.text}>FOLLOW OUR X</p>

        {/* Check Button */}
        <button className={styles.checkButton} onClick={handleButtonClick}>
          CHECK
        </button>
      </div>
    </div>
  );
};

export default TwitterPage;
