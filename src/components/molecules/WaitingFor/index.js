import React from "react";
import "./styles.css";
import LoadingIndicator from "../../atoms/LoadingIndicator";
import AppLabel, { TYPES } from "../../atoms/AppLabel";

export default function WaitingFor({ style = {}, className = "", text="No text passed here - WaitingFor" }) {
  return (
    <div className="waiting-for-empty-cont">
      <AppLabel isBold type={TYPES.SUB_TITLE}>
       {text}
      </AppLabel>
      <LoadingIndicator style={{ width: "50px", height: "50px" }} />
    </div>
  );
}
