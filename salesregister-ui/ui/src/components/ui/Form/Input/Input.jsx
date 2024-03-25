import React from "react";
import styles from "./styles.module.scss";

const Input = ({
  error = false,
  showErrorText = true,
  type,
  label,
  name,
  value = "",
  placeholder,
  onChangeHandler,
  onFocusHandler,
  className,
  mainClassName,
  ...props
}) => {
  return (
    <div className={`${styles.main} ${mainClassName || ""}`}>
      <label>{label}</label>
      <input
        className={`${styles.input} ${error ? styles.error : ""} ${className || ""}`}
        type={type || "text"}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
        onFocus={onFocusHandler}
        {...props}
      />
      {
        error && showErrorText ? (
          <span>This field is required</span>
        ) : null
      }
    </div>
  );
}

export default Input;