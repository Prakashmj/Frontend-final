import React from 'react';
import styles from '../styles/coins-per-tap.module.css';

const UpgradePage = ({ onClose }) => {
  const handleUpgradeClick = () => {
    // Logic for upgrading, e.g., deducting currency, etc.
    console.log('Upgrade clicked');
  };

  return (
    <div className={styles.container}>
      <div className={styles.upgradeBox}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose}>X</button>

        {/* Level Display */}
        <p className={styles.levelText}>LEVEL 2</p>

        {/* Coin Icon and Amount */}
        <div className={styles.coinContainer}>
          <img src="/coins-per-tap.svg" alt="Coin" className={styles.coinIcon} />
          <p className={styles.coinAmount}>10000</p>
        </div>

        {/* Upgrade Button */}
        <button className={styles.upgradeButton} onClick={handleUpgradeClick}>
          UPGRADE
        </button>
      </div>
    </div>
  );
};

export default UpgradePage;
