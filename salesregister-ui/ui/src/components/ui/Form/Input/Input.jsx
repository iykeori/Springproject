import React from "react";
import styles from "./styles.module.scss";

const Input = ({
    error = false,
    type,
    label,
    name,
    value = "",
    placeholder,
    onChangeHandler,
    ...props
}) => {
    return (
        <div className={styles.main}>
            <label>{label}</label>
            <input
                className={`${styles.input} ${error ? styles.error : ""}`}
                type={type || "text"}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChangeHandler}
                {...props}
            />
            {
                error ? (
                    <span>This field is required</span>
                ) : null
            }
        </div>
    );
}

export default Input;