import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/stats.module.css";
import Footer from "./footer";
import axios from "axios";

export default function Stats() {
  const router = useRouter();
  const [population, setPopulation] = useState(8109268260);
  const [suprHumans, setSuprHumans] = useState(0);
  const [userCode, setUserCode] = useState(""); // Default code or placeholder

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettingsModal = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  useEffect(() => {
    // Fetch the number of SuprHumans from the API
    const fetchSuprHumans = async () => {
      try {
        const response = await axios.get(
          "http://88.222.242.108:8080/get/all/user"
        );
        setSuprHumans(response.data.length); // Set the number of SuprHumans based on the length of the response data
      } catch (error) {
        console.error("Error fetching SuprHumans:", error);
      }
    };

    // Fetch the unique code for a specific user
    const fetchUserCode = async () => {
      // Retrieve the user ID from localStorage
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await axios.get(
            `http://88.222.242.108:8080/get/user/${userId}`
          );
          console.log("User code response:", response.data); // Debug log

          // Verify if response.data contains the user object
          const user = response.data.user || response.data; // Adjust based on the actual response structure
          if (user && user.uniqueId) {
            setUserCode(user.uniqueId); // Set the user's unique ID
          } else {
            console.warn("UniqueId not found in response data");
          }
        } catch (error) {
          console.error("Error fetching user code:", error);
        }
      } else {
        console.warn("User ID not found in localStorage");
      }
    };

    fetchSuprHumans();
    fetchUserCode();

    const updatePopulation = () => {
      setPopulation((prevPopulation) => prevPopulation + 1);
    };

    const interval = setInterval(updatePopulation, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.heading}>
          <span className={styles.supr}>SUPR</span>
          <span className={styles.human}>HUMAN</span>
        </h1>
        <img
          src="/settings.svg"
          alt="Settings"
          className={styles.settingsIcon}
          onClick={toggleSettingsModal}
        />
      </div>

      <div className={styles.statsGroup}>
        <div className={styles.statsBlockContainer}>
          <p className={styles.statsLabel}>
            NUMBER OF <span className={styles.highlight}>HUMANS</span> ON EARTH
          </p>
          <div className={styles.statsBlock}>
            <div className={styles.statsValue}>
              {population.toLocaleString("en-US")}
            </div>
          </div>
        </div>

        <div className={styles.statsBlockContainer}>
          <p className={styles.statsLabel}>
            NUMBER OF SUPR<span className={styles.highlight}>HUMANS</span> ON
            EARTH
          </p>
          <div className={styles.statsBlock}>
            <div className={styles.statsValue}>{suprHumans}</div>
          </div>
        </div>

        <div className={styles.statsBlockContainer}>
          <p className={styles.codeLabel}>
            YOUR UNIQUE SUPR<span className={styles.highlight}>HUMAN</span> CODE
          </p>
          <div className={styles.codeContainer}>
            <div className={styles.codeValue}>{userCode}</div>
          </div>
        </div>
      </div>

      {/* <div className={styles.airdropNoticeContainer}>
        <p className={styles.airdropNotice}>
          AIRDROPS WILL BE ANNOUNCED
          <br />
          ONCE WE HIT 1.5 MILLION
          <br />
          SUPR<span className={styles.highlight}>HUMANS</span>
        </p>
      </div> */}

      <Footer />
      {isSettingsOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={toggleSettingsModal}
            >
              <img src="/cross.svg" alt="Close" />
            </button>
            <div className={styles.formContainer}>
              <form>
                <label htmlFor="name" className={styles.label}>
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="NAME"
                  className={styles.inputField}
                />

                <label htmlFor="gender" className={styles.label}>
                  GENDER
                </label>
                <select id="gender" className={styles.selectField}>
                  <option value="" disabled hidden>
                    SELECTION
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <label htmlFor="country" className={styles.label}>
                  COUNTRY
                </label>
                <select id="country" className={styles.selectField}>
                  <option value="" disabled hidden>
                    SELECTION
                  </option>
                  {/* Add country options here */}
                </select>

                <label htmlFor="email" className={styles.label}>
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="EMAIL"
                  className={styles.inputField}
                />

                <button type="button" className={styles.actionButton1}>
                  CONNECT WALLET
                </button>
                <button type="button" className={styles.actionButton2} onClick={() => router.push('chooseCharacter')}>
                  CHANGE CHARACTER
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* ///////////////////////////////////////////////////////////////////////////// */}
    </div>
  );
}
