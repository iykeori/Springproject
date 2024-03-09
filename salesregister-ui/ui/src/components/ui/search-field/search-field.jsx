import React from "react";
import styles from "./styles.module.scss";

const SearchField = () => {
    return (
        <div className={styles.main}>
            <input type="text" placeholder="Search"/>
        </div>
    );
};

export default SearchField;