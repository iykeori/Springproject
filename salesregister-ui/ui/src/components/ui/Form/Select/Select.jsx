import React from "react";
import styles from "./styles.module.scss";


const Select = ({
    error = false,
    label,
    value = "",
    options = [],
    onChangeHandler,
    ...props
}) => {
    return (
        <div className={styles.main}>
            <label>{label}</label>
            <select
                className={`${styles.select} ${error ? styles.error : ""}`}
                value={value}
                onChange={onChangeHandler}
                {...props}
            >
                <option value="">Select</option>
                {
                    options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))  
                }
            </select>
            {
                error ? (
                    <span>This field is required</span>
                ) : null
            }
        </div>
    );
}

export default Select;