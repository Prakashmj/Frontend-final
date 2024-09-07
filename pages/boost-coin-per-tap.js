import React from 'react';
import styles from '../styles/boost-coin-per-tap.module.css';

const BoostCoinPerTap = ({onClose}) => {
  const handleUpgradeClick = () => {
    // Logic for upgrading or any other action
    console.log('Upgrade button clicked');
  };

  return (
    <div className={styles.container}>
      <div className={styles.upgradeBox}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose}>X</button>

        {/* Title */}
        <p className={styles.title}>COIN PER TAP</p>

        {/* Boost Coin Image */}
        <img src="/boost-coin-per-tap.svg" alt="Boost Coin" className={styles.boostCoinIcon} />

        {/* Level Display */}
        <p className={styles.levelText}>LEVEL 1</p>

        {/* Upgrade Button */}
        <button className={styles.upgradeButton} onClick={handleUpgradeClick}>
          UPGRADE
        </button>
      </div>
    </div>
  );
};

export default BoostCoinPerTap;
