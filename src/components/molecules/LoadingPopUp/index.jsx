import React from "react";
import "./styles.css";

import LoadingIndicator from "../../atoms/LoadingIndicator";

export default function LoadingPopUp({ isLoading = true }) {
  return (
    <div className={`loading-popup-cont ${isLoading ? "shown-popup" : ""}`}>
      <LoadingIndicator />
    </div>
  );
}
