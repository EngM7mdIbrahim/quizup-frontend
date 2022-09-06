import React from "react";
import "./styles.css";

import AppLabel, { TYPES } from "../AppLabel";

export default function LinkLabel({
  style = {},
  className = "",
  children = "",
  label = "Hello",
  href = "#",
}) {
  return (
      <AppLabel
        style={{ fontSize: '12px', ...style }}
        className={`className ${className}`}
        type={TYPES.PAR}
      >
        {label} <a href={href}>{children}</a>
      </AppLabel>
  );
}
