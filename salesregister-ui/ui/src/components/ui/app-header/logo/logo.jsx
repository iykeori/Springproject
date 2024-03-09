import React from "react";
import styles from "./styles.module.scss";
import {BiArchive} from "react-icons/bi";

const Logo = ({logo, ...props}) => {
    return (
        // <div className={styles.main}>
        //     <BiArchive className={styles.logo} />
        // </div>
        <div className={styles.main}>
            <img src={logo} alt="logo"/>
        </div>
    );
};

export default Logo;