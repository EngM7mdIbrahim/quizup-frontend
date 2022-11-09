import React from "react";
import AppLabel from "../../atoms/AppLabel";
import Image, { TYPES } from "../../atoms/Image";
import "./styles.css";

export default function ComponentErrorPrompt({
  error = "No error message passed - ComponentErrorPrompt",
  style = {},
  className = "",
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
        flexDirection: "column",
        ...style,
      }}
      className={`page ${className}`}
    >
      <Image type={TYPES.MED} imageName="logo-square.png" />
      <AppLabel style={{ textAlign: "center" }}>{error}</AppLabel>
    </div>
  );
}
