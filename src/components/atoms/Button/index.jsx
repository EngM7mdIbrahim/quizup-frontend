import React from "react";
import { ACCENT, PRIMARY, TEXT_COLOR } from "../../../styles/colors";
import AppLabel, { TYPES } from '../../atoms/AppLabel'
import "./styles.css";

export default function Button({
  style ={},
  children = ["No text here! - BA"],
  isPrimary = true,
  onClick = () => {
    console.error("No on click handler! - BA");
  },
  className = ""
}) 
{
  
  return isPrimary ? (
    <button className={`${className}`} style={{ backgroundColor: ACCENT, ...style }} onClick={onClick}>
      {children}
    </button>
  ) : (
    <button className={`${className}`} style={{ color: TEXT_COLOR, backgroundColor: PRIMARY, ...style }} onClick={onClick}>
      {children}
    </button>
  );
}
