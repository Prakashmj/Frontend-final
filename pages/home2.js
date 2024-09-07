import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/home2.module.css";
import Footer from "./footer";
import FirstFifty from "./first-fifty";
import { useRouter } from "next/router";

// Feature detection for multi-touch
const supportsMultiTouch = () => {
  return "maxTouchPoints" in navigator && navigator.maxTouchPoints > 1;
};

export default function Home() {
  const router = useRouter();

  const [characterImage, setCharacterImage] = useState("/avatar1.svg");
  const [energy, setEnergy] = useState({ current: 0, max: 1000 });
  const [timer, setTimer] = useState("00:00:00");
  const [coinsPerMinute, setCoinsPerMinute] = useState(0);
  const [coinsEarnToday, setCoinsEarnedToday] = useState(0);
  const [isFirstFiftyOpen, setIsFirstFiftyOpen] = useState(false);
  const [isEnergyIncreasing, setIsEnergyIncreasing] = useState(false);
  const [previousEnergy, setPreviousEnergy] = useState(0);
  const [coins, setCoins] = useState([]);

  // Function to add vibration on tapping
  const vibrate = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50); // Vibration for 50ms
    }
  };

  const handleSingleTap = (e) => {
    vibrate();
    const container = document.querySelector(`.${styles.pageContainer}`);
    const rect = container.getBoundingClientRect(); // Get the bounding rect of the container
    const x = e.clientX - rect.left; // Adjust x relative to the container
    const y = e.clientY - rect.top;  // Adjust y relative to the container
  
    // Add a new coin to the array with a unique ID and initial position
    setCoins((prevCoins) => [
      ...prevCoins,
      { id: Date.now(), left: x, top: y },
    ]);
  
    // Remove the coin after 1 second
    setTimeout(() => {
      setCoins((prevCoins) => prevCoins.filter((coin) => coin.id !== Date.now()));
    }, 1000);
  };
  
  const handleMultiTap = (e) => {
    vibrate();
    const container = document.querySelector(`.${styles.pageContainer}`);
    const rect = container.getBoundingClientRect(); // Get the bounding rect of the container
  
    for (let i = 0; i < e.touches.length; i++) {
      const x = e.touches[i].clientX - rect.left;
      const y = e.touches[i].clientY - rect.top;
  
      // Add a new coin for each touch point
      setCoins((prevCoins) => [
        ...prevCoins,
        { id: Date.now() + i, left: x, top: y },
      ]);

      setTimeout(() => {
        setCoins((prevCoins) => prevCoins.filter((coin) => coin.id !== Date.now() + i));
      }, 1000);
    }
  };
  
  

  // Event listener based on touch capabilities
  useEffect(() => {
    const tapHandler = supportsMultiTouch() ? handleMultiTap : handleSingleTap;

    document.addEventListener("touchstart", tapHandler);
    return () => {
      document.removeEventListener("touchstart", tapHandler);
    };
  }, []);

  
  useEffect(() => {
    const firstFiftyShown =
      typeof window !== "undefined" && localStorage.getItem("firstFiftyShown");

    if (!firstFiftyShown) {
      setIsFirstFiftyOpen(true);
      typeof window !== "undefined" &&
        localStorage.setItem("firstFiftyShown", "true");
    }

    // Retrieve coinsEarnedToday from localStorage
    const storedCoinsEarnedToday =
      typeof window !== "undefined" && localStorage.getItem("coinsEarnToday");
    if (storedCoinsEarnedToday) {
      setCoinsEarnedToday(Number(storedCoinsEarnedToday));
    }
  }, []);

  useEffect(() => {
    const updateCoins = async () => {
      try {
        const userId =
          typeof window !== "undefined" && localStorage.getItem("userId");
        if (userId) {
          setCoinsEarnedToday((prevCoinsEarned) => {
            const newCoinsEarnedToday = prevCoinsEarned + coinsPerMinute;

            // Update localStorage
            typeof window !== "undefined" &&
              localStorage.setItem("coinsEarnToday", newCoinsEarnedToday);

            // Send PUT request to update coins earned today
            axios
              .put(
                `http://88.222.242.108:8080/update/coins/earntoday/${userId}`,
                {
                  coinsEarnToday: newCoinsEarnedToday,
                }
              )
              .catch((error) => {
                console.error("Error updating coins earned today:", error);
              });

            return newCoinsEarnedToday;
          });
        } else {
          console.warn("User ID not found in localStorage");
        }
      } catch (error) {
        console.error("Error updating coins:", error);
      }
    };

    const intervalId = setInterval(updateCoins, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, [coinsPerMinute]);

  // Update timer
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTimer(`${hours}:${minutes}:${seconds}`);
    };

    const intervalId = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  useEffect(() => {
    // Check if energy has stopped decreasing
    if (energy.current >= previousEnergy) {
      setIsEnergyIncreasing(true);
    } else {
      setIsEnergyIncreasing(false);
    }

    setPreviousEnergy(energy.current);
  }, [energy.current]);

  useEffect(() => {
    if (isEnergyIncreasing) {
      const intervalId = setInterval(() => {
        setEnergy((prevEnergy) => {
          const newEnergy = Math.min(prevEnergy.current + 3, prevEnergy.max);
          return { ...prevEnergy, current: newEnergy };
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isEnergyIncreasing]);

  const handleCharacterImageClick = async () => {
    try {
      const userId =
        typeof window !== "undefined" && localStorage.getItem("userId");
      if (!userId) {
        console.warn("User ID not found in localStorage");
        return;
      }

      const response = await axios.put(
        `http://88.222.242.108:8080/update/coin/${userId}`
      );
      if (response.status === 200) {
        const updatedUser = response.data.updatedUser;
        if (updatedUser) {
          const updatedCoins = Number(updatedUser.signupCoin) || 0;
          setCoins(updatedCoins);

          const updatedEnergy = updatedUser.energy || { current: 0, max: 1000 };
          setEnergy(updatedEnergy);
        } else {
          console.error("Updated user data is missing in the response");
        }
      } else {
        console.error("Error updating coins:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating coins:", error);
    }
  };

  // Function to format numbers with thousands separators
  const formatNumberWithCommas = (num) => {
    if (num === null || num === undefined) return "0";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatNumber = (value) => {
    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1) + "m"; // 1.0m, 2.5m
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(1) + "k"; // 1.0k, 2.5k
    } else {
      return value; // No formatting for values less than 1000
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.heading}>
          <span className={styles.supr}>SUPR</span>
          <span className={styles.human}>HUMAN</span>
        </h1>
      </div>

      <div className={styles.coinsContainer}>
        <p className={styles.coinsLabel}>{formatNumberWithCommas(coins)}</p>
      </div>

      <div className={styles.characterContainer}>
        <div className={styles.boostContainer}>
          <div className={styles.boostTextContainer}>
            <p className={styles.boostLabel}>BOOST</p>
          </div>
          <div className={styles.boostIconContainer} onClick={() => router.push('boost')}>
            <img src="/boost.svg" alt="Boost" className={styles.boostIcon} />
          </div>
        </div>



        <div className={styles.energyContainer}>
          <div className={styles.energyIconContainer}>
            <p className={styles.energyLabel}>ENERGY</p>
            <p className={styles.energyValue}>
              {energy.current}/{energy.max}
            </p>
          </div>
        </div>
        <img
          src={characterImage}
          alt="Character"
          className={styles.characterImage}
          onClick={handleCharacterImageClick}
        />

<div className={styles.coinsPerMinContainer}>
    <img
      src="/coins-per-min.svg"
      alt="Coin Per Minute"
      className={styles.coinsPerMinIcon}
    />
    <div className={styles.coinsPerMinLabelContainer}>
      <p className={styles.coinsPerMinLabel}>COINS/MIN</p>
      <p className={styles.coinsPerMinValue}>{coinsPerMinute}</p> {/* Replace with dynamic value */}
    </div>
  </div>
  </div>

  <p className={styles.coinsEarned}>COINS EARNED TODAY</p>

  <div className={styles.coinsContainer}>
        <p className={styles.coinsLabel}>{formatNumberWithCommas(coinsEarnToday)}</p>
    </div>

        <div className={styles.timeContainer}>
          <p className={styles.timeLabel}>{timer}</p>
        </div>



      {isFirstFiftyOpen && <FirstFifty />}
      <Footer />

      {isFirstFiftyOpen && (
        <FirstFifty onClose={() => setIsFirstFiftyOpen(false)} />
      )}

{coins.map(coin => (
        <div
          key={coin.id}
          className={styles.coinPerTap}
          style={{ left: `${coin.left}px`, top: `${coin.top}px` }}
        />
      ))}


    </div>
  );
};
