import React from "react";
import styles from "./styles.module.scss";
import Logo from "../logo/logo";
import logo from './logo.png';


const Header = () => {
  return (
    <div className={styles.main}>
      <Logo
        logo={logo}
      />
    </div>
  );
};

export default Header;