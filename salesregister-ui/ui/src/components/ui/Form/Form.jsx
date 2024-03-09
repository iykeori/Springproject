import React from "react";
import styles from "./styles.module.scss";

const Form = ({children, onSubmitHandler, style = {}, className}) => {
    return(
        <Form
            onSubmit={onSubmitHandler}
            style={style}
            className={className || ""}
        >
            {children}
        </Form>
    )
}

export default Form;