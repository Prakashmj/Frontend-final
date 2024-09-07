import React, { useState, useEffect } from "react";
import styles from "../styles/profile.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Select from "react-select"; // Import react-select

export default function Profile() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState(null); // Updated state to handle react-select value
  const [country, setCountry] = useState(null);
  const [email, setEmail] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [genderOptions] = useState([
    { value: "male", label: "MALE" },
    { value: "female", label: "FEMALE" },
    { value: "other", label: "OTHER" }
  ]); // Define gender options
  const router = useRouter();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryData = response.data.map((country) => ({
          value: country.cca2,
          label: country.name.common,
        }));
        setCountryOptions(countryData);
      } catch (error) {
        console.error("Error fetching countries:", error);
        toast.error("Failed to load countries.");
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = async () => {
    const data = {
      name: name,
      gender: gender ? gender.value.toLowerCase() : "",
      country: country ? country.value.toLowerCase() : "",
      email: email,
    };

    try {
      const response = await axios.post("http://88.222.242.108:8080/user/register", data);

      console.log("API Response:", response);

      if (response && response.data && response.data.user) {
        const userToken = response.data.user.userToken;
        const userId = response.data.user._id;

        if (userToken && userId) {
          localStorage.setItem("token", userToken);
          localStorage.setItem("userId", userId);

          toast.success("Signup successful!", { autoClose: 10000 });

          setTimeout(() => {
            router.push("/chooseCharacter");
          }, 10000);
        } else {
          toast.error("Failed to retrieve user details from the response.");
        }
      } else {
        toast.error("Unexpected response format from the server.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Failed to register user. Please try again.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.heading}>
        <span className={styles.supr}>SUPR</span>
        <span className={styles.human}>HUMAN</span>
      </h1>
      <div className={styles.formContainer}>
        <form>
          <label htmlFor="name" className={styles.label}>
            ENTER NAME
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="NAME"
            className={styles.inputField}
          />

          <label htmlFor="gender" className={styles.label}>
            SELECT GENDER
          </label>
          <Select
            id="gender"
            options={genderOptions}
            value={gender}
            onChange={setGender}
            className={styles.selectFieldGender}
            placeholder="SELECT"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#000000",  // Match background color
                color: "#ff7500",            // Match font color
                border: "2.7px solid #ff7500",
                borderRadius: "5px",
                fontSize: "12px",
                position: "relative",
                padding:'0.38rem',
                marginBottom:'1.2rem',
              }),
              singleValue: (base) => ({
                ...base,
                color: "#ff7500",            // Font color for selected option
                textTransform: "uppercase",  // Ensure selected value is uppercase
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#000000",  // Match background color for dropdown
                color: "#ff7500",            // Font color for dropdown options
              }),
              option: (base, { isFocused }) => ({
                ...base,
                backgroundColor: isFocused ? "#ff7500" : "#000000",  // Highlight on hover
                color: isFocused ? "#000000" : "#ff7500",            // Inverted text color on hover
                textTransform: "uppercase",  // Ensure option text is uppercase
              }),
              indicatorSeparator: () => ({
                display: 'none',  // Hide default separator
              }),
              dropdownIndicator: (base) => ({
                ...base,
                backgroundColor: '#000000',
                color: '#ff7500',  // Match arrow color
                padding: '0px',    // Remove default padding
                width: '24px',     // Set width to match your arrow size
                height: '24px',    // Set height to match your arrow size
              }),
            }}
          />

          <label htmlFor="country" className={styles.label}>
            SELECT COUNTRY
          </label>
          <Select
            id="country"
            options={countryOptions}
            value={country}
            onChange={setCountry}
            className={styles.selectFieldCountry}
            placeholder="SELECT"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#000000",  // Match background color
                color: "#ff7500",            // Match font color
                border: "2.7px solid #ff7500",
                borderRadius: "5px",
                fontSize: "12px",
                position: "relative",
                padding:'0.38rem',
                marginBottom:'1.2rem',
              }),
              singleValue: (base) => ({
                ...base,
                color: "#ff7500",            // Font color for selected option
                textTransform: "uppercase",  // Ensure selected value is uppercase
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#000000",  // Match background color for dropdown
                color: "#ff7500",            // Font color for dropdown options
              }),
              option: (base, { isFocused }) => ({
                ...base,
                backgroundColor: isFocused ? "#ff7500" : "#000000",  // Highlight on hover
                color: isFocused ? "#000000" : "#ff7500",            // Inverted text color on hover
                textTransform: "uppercase",  // Ensure option text is uppercase
              }),
              indicatorSeparator: () => ({
                display: 'none',  // Hide default separator
              }),
              dropdownIndicator: (base) => ({
                ...base,
                backgroundColor: '#000000',
                color: '#ff7500',  // Match arrow color
                padding: '0px',    // Remove default padding
                width: '24px',     // Set width to match your arrow size
                height: '24px',    // Set height to match your arrow size
              }),
            }}
          />

          <label htmlFor="email" className={styles.label}>
            ENTER EMAIL
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL"
            className={styles.inputField}
          />

          <div className={styles.disclaimer}>
            <strong>DISCLAIMER:</strong> EMAIL PROVIDED NOW CANNOT BE <br />
            CHANGED IN THE FUTURE FOR AIRDROPS.
          </div>
        </form>
      </div>
      <button
        type="button"
        className={styles.nextButton}
        onClick={handleSubmit}
      >
        NEXT <img src="/arrow-black.svg" alt="Arrow" className={styles.arrow} />
      </button>
      <ToastContainer />
    </div>
  );
}
