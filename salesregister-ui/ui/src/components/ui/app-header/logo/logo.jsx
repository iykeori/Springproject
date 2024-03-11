import React from "react";
import styles from "./styles.module.scss";

const Logo = ({logo, ...props}) => {
    return (
        <div className={styles.main}>
            <a href="/">
                <img src={logo} className={styles.headerLogo}  alt="logo"/>
            </a>
        </div>
    );
};

export default Logo;