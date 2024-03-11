import React from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import globalStyles from "../../../src/global.module.scss"


const Home = ({ props }) => {

  const navigate = useNavigate();

//   const handleRegisterClick = () => {
//     console.log("ClicKed!");
//     navigate("/register");
//   };

  return (
    <div className={styles.main}>
      {/* <h1>Welcome to Transaction Register</h1> */}
        <button className={globalStyles.bigFancyButton} onClick={() => navigate("/register")}>Register Product</button>
        <button className={globalStyles.bigFancyButton} onClick={() => navigate("#")}>View Records</button>

    </div>
  );
}

export default Home;