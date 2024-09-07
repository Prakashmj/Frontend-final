import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/chooseCharacter.module.css";

export default function ChooseCharacter() {
  const [currentCharacter, setCurrentCharacter] = useState(0);
  const [touchStart, setTouchStart] = useState(null); // Track the start of a touch
  const router = useRouter(); // Initialize useRouter

  const characters = [
    "/avatar1.svg",
    "/avatar2.svg",
    "/avatar3.svg",
    "/avatar4.svg",
  ];

  const handleNextCharacter = () => {
    setCurrentCharacter((prev) => (prev + 1) % characters.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) {
      handleNextCharacter(); // Swipe left to go to the next character
    }
  };

  const handleSelectCharacter = async () => {
    const selectedCharacter = characters[currentCharacter];
    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `http://88.222.242.108:8080/update/user/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ characterImage: selectedCharacter }), // Send selected character image
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update character image");
      }

      const result = await response.json();
      console.log("Character updated successfully:", result);
      router.push("/home"); // Redirect to home page on success
    } catch (error) {
      console.error("Error updating character image:", error);
      alert("Failed to update character image");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>
        <span className={styles.supr}>SUPR</span>
        <span className={styles.human}>HUMAN</span>
      </h1>
      <div className={styles.characterDiv}>
        <h2 className={styles.subheading}>
          <span className={styles.chooseWhite}>CHOOSE YOUR</span>
          <span className={styles.human}> SUPRHUMAN</span>
        </h2>
        <div
          className={styles.characterSlider}
          onTouchStart={(e) => handleTouchStart(e)}
          onTouchEnd={(e) => handleTouchEnd(e)}
        >
          <img
            src={characters[currentCharacter]}
            alt="Character"
            className={styles.characterImage}
          />
        </div>
        <button onClick={handleNextCharacter} className={styles.swipeButton}>
          SWIPE HERE{" "}
          <img src="/arrow-black.svg" alt="Arrow" className={styles.arrow} />
        </button>
      </div>
      <button className={styles.selectButton} onClick={handleSelectCharacter}>
        SELECT
      </button>
    </div>
  );
}
