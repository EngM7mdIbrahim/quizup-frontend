import React from "react";
import { ACCENT, PRIMARY, TEXT_COLOR } from "../../../styles/colors";
import LoadingIndicator from "../LoadingIndicator";
import "./styles.css";

export default function Button({
  isLoading = false,
  loadingIcon = "logo-square-white.png",
  stopPropagation = false,
  style = {},
  children = ["No text here! - BA"],
  isPrimary = true,
  onClick = () => {
    console.error("No on click handler! - BA");
  },
  className = "",
}) {
  const renderedChildren = isLoading ? (
    <LoadingIndicator
      iconName={loadingIcon}
      style={{ alignSelf: 'center', width: "20px", height: "20px" }}
    />
  ) : (
    children
  );
  return isPrimary ? (
    <button
      disabled={isLoading}
      className={`${className}`}
      style={{ backgroundColor: ACCENT, ...style }}
      onClick={(e) => {
        onClick();
        stopPropagation && e.stopPropagation();
      }}
    >
      {renderedChildren}
    </button>
  ) : (
    <button
      disabled={isLoading}
      className={`${className}`}
      style={{ color: TEXT_COLOR, backgroundColor: PRIMARY, ...style }}
      onClick={onClick}
    >
      {renderedChildren}
    </button>
  );
}
