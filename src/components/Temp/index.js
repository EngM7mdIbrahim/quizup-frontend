import React from "react";
import './styles.css'

export default function SideTabBarItems({ style = {}, className = "" }) {
  return <div style={{ ...style }} className={`className ${className}`}>

  </div>;
}
