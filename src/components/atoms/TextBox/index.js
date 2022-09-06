import React from "react";
import { BLACK, isDark, WHITE } from "../../../styles/colors";
import "./styles.css";

export default function TextBox({
  value = "",
  placeholder = "No paceholder here - TBA",
  onChange = (newValue) => {
    console.error("No on change handler - TBA", newValue);
  },
  onBlur = undefined,
  style={},
  className = "",
  name = "",
  isPassword = false
}) {
  return (
    <input
      style={{color: isDark ? WHITE : BLACK, ...style }}
      id ={name}
      name = {name}
      className={`${className}`}
      type={isPassword ? 'password' : 'text'}
      placeholder={placeholder}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
}
