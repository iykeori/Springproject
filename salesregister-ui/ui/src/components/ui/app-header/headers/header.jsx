import React from "react";
import styles from "./styles.module.scss";
import Logo from "../logo/logo";


const Header = () => {
    return (
        <div className={styles.main}>
            <Logo
                logo="../app-header/logo/logo.png"
            />
        </div>
    );
};

export default Header;