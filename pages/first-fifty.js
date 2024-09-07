import React from "react";
import styles from "../styles/first-fifty.module.css";

const FirstFifty = ({ onClose }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.messageBox}>
        <img
          src="/cross.svg"
          alt="Close"
          className={styles.closeButton}
          onClick={onClose}
        />
        <p className={styles.message}>
          Welcome to the Suprhuman community. As a token of appreciation for
          being a part of a revolution in its early stages, we are offering you
          100,000 Supr coins.
        </p>
      </div>
    </div>
  );
};

export default FirstFifty;
