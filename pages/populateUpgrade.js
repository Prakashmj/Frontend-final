import React from "react";
import styles from "../styles/honesty.module.css";

const populateUpgrade = () => {
  return (
    <div className={styles.honestyCard}>
      {/* Icon section */}
      <div className={styles.iconSection}>
        <div className={styles.iconCircle}>
          {/* SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className={styles.icon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 14.828a4 4 0 010-5.656M12 4.5v-.75a.75.75 0 00-1.5 0V4.5m6 0v-.75a.75.75 0 00-1.5 0V4.5m2.61 3.19a1.5 1.5 0 10-2.12-2.12m-8.97 0a1.5 1.5 0 10-2.12 2.12m10.97 4.37l1.415 1.415m0-3.415L15.88 11m1.415 3.585L14.88 15m1.415 1.415l1.415-1.415m0 3.415L14.88 19m-9-9l-1.415-1.415m0 3.415L8.88 11M7.465 7.465l1.415 1.415m-1.415 0L5.05 9.05m9.9 4.95a4.992 4.992 0 00-1.415 3.535v3a2 2 0 01-2 2h-2a2 2 0 01-2-2v-3a4.992 4.992 0 00-1.415-3.535m8.83 0L18.7 15"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h2 className={styles.honestyTitle}>HONESTY</h2>

      {/* Description */}
      <p className={styles.honestyDescription}>
        BEING TRUTHFUL AND TRANSPARENT IN WORDS AND ACTIONS.
      </p>

      {/* Stats section */}
      <div className={styles.statsSection}>
        <div className={styles.statsLabels}>
          <span>LEVEL</span>
          <span>COST</span>
          <span>COIN/MIN</span>
        </div>
        <div className={styles.statsValues}>
          <span>1</span>
          <span>1K</span>
          <span>+0.1</span>
        </div>
      </div>

      {/* Upgrade button */}
      <button className={styles.upgradeButton}>UPGRADE</button>
    </div>
  );
};

export default populateUpgrade;
