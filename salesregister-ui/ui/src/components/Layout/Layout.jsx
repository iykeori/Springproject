import React from "react";
import styles from "./styles.module.scss";
import { Outlet } from "react-router-dom";
import AppHeader from "../ui/app-header/app-header/app-header";
import { UpdateRecordContext } from "../../util/context/UpdateRecordContext";


const Layout = ({ props }) => {
  const [hasUpdated, setHasUpdated] = React.useState("");


  return (
    <UpdateRecordContext.Provider value={{ hasUpdated, setHasUpdated }}>
      <div className={styles.main}>
        <header>
          <AppHeader />
        </header>
        {/* <h2> Layout</h2> */}

        <main className="container">
          <Outlet />
        </main>
      </div>
    </UpdateRecordContext.Provider>
  );
};

export default Layout;