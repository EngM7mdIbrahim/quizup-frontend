import React from "react";
import Button from "../../atoms/Button";
import AppLabel, { TYPES } from "../../atoms/AppLabel";
import "./styles.css";
import IconButton from "../../atoms/IconButton";
import { PRIMARY, SECONDARY } from "../../../styles/colors";

export default function AlertPopUp({
  alertMessage = "No Alert message passed - AlertPopUp",
  onConfirm = () => {
    console.error("No on confirm hanlder passed - AlertPopUp");
  },
  onCancel = () => {
    console.error("No on cancel hanlder passed - AlertPopUp");
  },
}) {
  return (
    <div
      style={{ flexDirection: "column", gap: "40px" }}
      className={`loading-popup-cont ${
        alertMessage !== "" ? "shown-popup" : ""
      }`}
    >
      <div style={{backgroundColor: PRIMARY}} className="alert-box-cont">
        <div className="alert-box-title-cont">
        <AppLabel isBold type={TYPES.SUB_TITLE}>Alert!</AppLabel>
        <IconButton onClick={onCancel}  iconName="cross.png" backgroundColor={PRIMARY} />
        </div>
        <hr style={{backgroundColor: SECONDARY}} />
        <AppLabel className="alert-box-details" type={TYPES.PAR}>{alertMessage}</AppLabel>
        <Button onClick={onConfirm} style={{alignSelf: 'center'}} isPrimary>OK!</Button>
      </div>
    </div>
  );
}
