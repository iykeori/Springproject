import React from "react";
import styles from "./styles.module.scss";
import Logo from "../logo/logo";


const Header = () => {
    return (
        <div className={styles.main}>
            <Logo
                logo="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            />
        </div>
    );
};

export default Header;