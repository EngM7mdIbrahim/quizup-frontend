import React from "react";
import Button from "../../atoms/Button";
import AppLabel from "../../atoms/AppLabel";
import "./styles.css";

export default function ErrorPopUp({
  errorMessage = "",
  onClick = () => {
    console.error("No on click handler passed! - EPM");
  },
}) {
  return (
    <div
      style={{ flexDirection: "column", gap: "40px" }}
      className={`loading-popup-cont ${
        errorMessage !== "" ? "shown-popup" : ""
      }`}
    >
      <AppLabel style={{ textAlign: "center", color: "white" }}>
        {errorMessage}
      </AppLabel>
      <Button isPrimary onClick={onClick}>
        OK
      </Button>
    </div>
  );
}
