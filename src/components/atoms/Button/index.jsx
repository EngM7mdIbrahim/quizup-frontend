import React from "react";
import { ACCENT, PRIMARY } from "../../../styles/colors";
import AppLabel, { TYPES } from '../../atoms/AppLabel'
import "./styles.css";

export default function Button({
  children = "No text here! - BA",
  isPrimary = true,
  onClick = () => {
    console.error("No on click handler! - BA");
  },
  className = ""
}) {
  return isPrimary ? (
    <button className={`${className}`} style={{ backgroundColor: ACCENT }} onClick={onClick}>
      {children}
    </button>
  ) : (
    <div className={`secondary-button ${className}`} onClick={onClick}>
      <AppLabel type={TYPES.SUB_SUB_TITLE} style={{ color: PRIMARY }}>{children}</AppLabel>
    </div>
  );
}
