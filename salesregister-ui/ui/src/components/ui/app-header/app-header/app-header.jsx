import React from "react";
import styles from "./styles.module.scss";
import Header from "../headers/header";


const AppHeader = () => {
    return (
        <div className={styles.main}>
            <Header/>
        </div>
    );
};

export default AppHeader;