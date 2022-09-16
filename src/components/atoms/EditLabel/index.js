import React from "react";
import { TEXT_COLOR } from "../../../styles/colors";
import "./styles.css";

export const INPUT_SIZES = {
  TITLE: "48px",
  SUB_TITLE: "32px",
  SUB_SUB_TITLE: "24px",
  PAR: "18px",
  TINY: "12px",
};

export default function EditLabel({
  style = {},
  className = "",
  isBold = false,
  type = INPUT_SIZES.TITLE,
  value = "No value passed here - EditLabel",
  onNewValue = (newValue) => {
    console.error("No on new value handler! - EditLabel", newValue);
  },
}) {
  return (
    <input
      value={value}
      onChange={(e) => {
        onNewValue(e.target.value);
      }}
      className={`${
        isBold ? "bold-text" : ""
      } edit-label-input ${className}`}
      style={{ fontSize: type, color: TEXT_COLOR, ...style }}
    />
  );
}
