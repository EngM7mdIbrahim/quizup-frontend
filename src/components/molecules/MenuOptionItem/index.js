import React from "react";
import "./styles.css";
import { SECONDARY } from "../../../styles/colors";
import IconBackground from "../IconBackground";
import AppLabel, { TYPES } from "../../atoms/AppLabel";

export default function MenuOptionItem({
  style = {},
  className = "",
  iconName="add.png",
  selected = false,
  value="No value passed here - MenuOptionItem ",
  onClick = () =>
    console.error(
      "No on click hanlder was passed - CreateQuestionPreviewItem."
    ),
}) {
  return (
    <div
      onClick={() => {
        onClick();
      }}
      style={{ backgroundColor: SECONDARY, ...style }}
      className={`create-question-preview-item-cont ${
        selected ? "selected-item" : ""
      } ${className}`}
    >
      <div className="create-question-preview-item-actions-cont">
        <IconBackground big iconName={iconName} />
      </div>
      <AppLabel style={{textAlign: 'center'}} isBold type={TYPES.PAR}>{value}</AppLabel>
    </div>
  );
}
