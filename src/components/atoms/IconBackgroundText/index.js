import React from "react";
import { ACCENT, WHITE } from "../../../styles/colors";
import AppLabel, { TYPES } from "../AppLabel";
import "./styles.css";

const CHOICES = "ABCD";

export default function IconBackgroundText({  letter=undefined, style = {}, className = "" }) {
  return (
    <div style={{ backgroundColor: ACCENT, ...style }} className={`question-opt-icon-cont ${className}`}>
      <AppLabel isBold style={{ color: WHITE}} type={TYPES.SUB_TITLE}>
        {letter!==undefined ? CHOICES[letter]: 'No letter passed here! - IconBackgroundText'}
      </AppLabel>
    </div>
  );
}
