import React from "react";
import styles from "./styles.module.scss";
import { Outlet } from "react-router-dom";
import AppHeader from "../ui/app-header/app-header/app-header";


const Layout = ({props}) => {
    return (
        <div className={styles.main}>
            <header>
                <AppHeader />
            </header>
            <h2> Layout</h2>
            
            <main className="container">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;