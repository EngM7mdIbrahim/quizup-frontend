import React from "react";
import "./styles.css";

import AppLabel, { TYPES } from "../AppLabel";
import { Link } from "react-router-dom";

export default function LinkLabel({
  style = {},
  className = "",
  children = "",
  label = "Hello",
  react = false,
  href = "#",
}) {
  return (
    <AppLabel
      style={{ fontSize: "12px", ...style }}
      className={`className ${className}`}
      type={TYPES.PAR}
    >
      {label}{" "}
      {react ? (
        <Link to={href}>{children}</Link>
      ) : (
        <a href={href}>{children}</a>
      )}
    </AppLabel>
  );
}
