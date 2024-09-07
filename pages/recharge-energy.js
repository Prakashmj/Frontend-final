import React from 'react';
import styles from '../styles/recharge-energy.module.css';

const RechargeEnergy = ({ onClose }) => {
  const handleUseClick = () => {
    console.log('Use button clicked');
  };

  return (
    <div className={styles.container}>
      <div className={styles.energyBox}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose}>X</button>

        {/* Title */}
        <p className={styles.title}>RECHARGE ENERGY</p>

        {/* Energy Icon */}
        <img src="/recharge-energy.svg" alt="Energy Icon" className={styles.energyIcon} />

        {/* Energy Level Display */}
        <p className={styles.energyLevel}>5/5</p>

        {/* Use Button */}
        <button className={styles.useButton} onClick={handleUseClick}>
          USE
        </button>
      </div>
    </div>
  );
};

export default RechargeEnergy;
