import React from "react";
import './styles.css'

export default function ReportsTemplate({ style = {}, className = "" }) {
  return <div style={{...style }} className={`profile-template-page ${className}`}>
    ReportsTemplate
  </div>;
}
