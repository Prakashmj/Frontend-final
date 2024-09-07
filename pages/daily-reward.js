import React from 'react';
import styles from '../styles/daily-reward.module.css';

const DailyReward = ({ onClose, currentDay }) => {
  const totalDays = 30; // Default number of divs set to 30

  const renderDayDivs = () => {
    let dayDivs = [];
    for (let i = 1; i <= totalDays; i++) {
      dayDivs.push(
        <div
          key={i}
          className={`${styles.dayDiv} ${i === currentDay ? styles.activeDay : ''}`}
        >
          {i}
        </div>
      );
    }
    return dayDivs;
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.rewardBox}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2 className={styles.heading}>DAILY REWARD</h2>
        <div className={styles.daysGrid}>
          {renderDayDivs()}
        </div>
        <button className={styles.claimButton}>CLAIM</button>
      </div>
    </div>
  );
};

export default DailyReward;