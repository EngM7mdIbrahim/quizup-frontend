import React from "react";
import "./styles.css";
import { ACCENT, WHITE } from "../../../styles/colors";
import AppLabel, { TYPES } from "../../atoms/AppLabel";

const CHOICES = "ABCD";

export default function ChoiceStatsItem({
  style = {},
  barColor = ACCENT,
  choice = 0,
  className = "",
  number = 3,
  total = 5,
}) {
  let newTotal = total === 0 ? 1 : total
  const width = 2+ 98*(number/newTotal);
  return (
    <div style={{ ...style }} className={`choice-stat-item-cont ${className}`}>
      <div
        className="question-opt-icon-cont"
        style={{ backgroundColor: ACCENT }}
      >
        <AppLabel isBold style={{ color: WHITE }} type={TYPES.SUB_TITLE}>
          {CHOICES[choice]}
        </AppLabel>
      </div>
      <div style={{flex: 1}}>
      <div style={{width: `${width>100?100:width}%`,backgroundColor: barColor}} className="choice-stat-item-bar"/>
      </div>
      <AppLabel isBold type={TYPES.SUB_TITLE}>{number}</AppLabel>
    </div>
  );
}
