import React, { useState } from 'react';
import styles from '../styles/boost.module.css';
import Footer from './footer';
import RechargeEnergy from './recharge-energy'; // Import the RechargeEnergy component
import UpgradePage from './boost-coin-per-tap'; // Import the UpgradePage component
import { useRouter } from 'next/router'; // Importing useRouter for navigation

export default function Boost() {
  const router = useRouter(); // Initialize the router
  const [isEnergyPopUpVisible, setIsEnergyPopUpVisible] = useState(false); // State to control pop-up visibility for energy
  const [isUpgradePopUpVisible, setIsUpgradePopUpVisible] = useState(false); // State to control pop-up visibility for upgrade

  const handleEnergyClick = () => {
    setIsEnergyPopUpVisible(true); // Show the pop-up when "RECHARGE ENERGY" is clicked
  };

  const handleUpgradeClick = () => {
    setIsUpgradePopUpVisible(true); // Show the pop-up when "LEVEL 1" is clicked
  };

  const handleClosePopUp = () => {
    setIsEnergyPopUpVisible(false); // Hide the energy pop-up
    setIsUpgradePopUpVisible(false); // Hide the upgrade pop-up
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.heading}>
          <span className={styles.supr}>SUPR</span><span className={styles.human}>HUMAN</span>
        </h1>
        <img
          src="/cross.svg"
          alt="Close"
          className={styles.closeIcon}
          onClick={() => router.push('/home')} // Navigates to the home page on click
        />
      </div>

      <div className={styles.boostGroup}>
        <h2 className={styles.boostLabel}>BOOST</h2>
        <div className={styles.boostIcon}>
          <img src="/boost-orange.svg" alt="Boost Icon" />
        </div>

        {/* Recharge Energy Section */}
        <div className={styles.boostBlockContainer} onClick={handleEnergyClick}>
          <p className={styles.boostBlockLabel}>RECHARGE ENERGY</p>
          <div className={styles.boostBlock}>
            <img src="/recharge-energy.svg" alt="Energy Icon" className={styles.blockIcon} />
            <div className={styles.boostBlockValue}>5/5</div>
            <img src="/arrow-orange.svg" alt="Arrow" className={styles.arrowIcon} />
          </div>
        </div>

        {/* Coin Per Tap Block */}
        <div className={styles.boostBlockContainer} onClick={handleUpgradeClick}>
          <p className={styles.boostBlockLabel}>COIN PER TAP</p>
          <div className={styles.boostBlock}>
            <img src="/boost-coin-per-tap.svg" alt="Coin Icon" className={styles.blockIcon2} />
            <div className={styles.boostBlockValue}>LEVEL 1</div>
            <img src="/arrow-orange.svg" alt="Arrow" className={styles.arrowIcon} />
          </div>
        </div>
      </div>

      {/* Pop-up for recharge energy */}
      {isEnergyPopUpVisible && (
        <div className={styles.energyPopUpOverlay}>
          <div className={styles.energyBoxWrapper}>
            <RechargeEnergy onClose={handleClosePopUp} /> {/* Pass the onClose prop */}
          </div>
        </div>
      )}

      {/* Pop-up for coin per tap upgrade */}
      {isUpgradePopUpVisible && (
        <div className={styles.energyPopUpOverlay}>
          <div className={styles.energyBoxWrapper}>
            <UpgradePage onClose={handleClosePopUp} /> {/* Pass the onClose prop */}
          </div>
        </div>
      )}

      {/* Include Footer Component */}
      <Footer />
    </div>
  );
}
