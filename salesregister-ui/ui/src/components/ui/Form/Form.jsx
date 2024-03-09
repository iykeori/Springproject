import React from "react";
import styles from "./styles.module.scss";

const Form = ({children, onSubmitHandler, style = {}, className}) => {
    return(
        <form
            onSubmit={onSubmitHandler}
            style={style}
            className={className || ""}
        >
            {children}
        </form>
    )
}

export default Form;