import React from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";


const Home = ({ props }) => {

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    console.log("ClicKed!");
    navigate("/register");
  };

  return (
    <div className={styles.main}>
      {/* <h1>Welcome to Transaction Register</h1> */}
      <button onClick={handleRegisterClick}>Register Product</button>

    </div>
  );
}

export default Home;