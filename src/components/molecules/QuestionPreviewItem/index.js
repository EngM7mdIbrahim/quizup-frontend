import React from "react";
import "./styles.css";
import { SECONDARY, ACCENT } from "../../../styles/colors";
import IconButton from "../../atoms/IconButton";
import IconBackground from "../../molecules/IconBackground";
import Button from "../../atoms/Button";
import { nanoid } from "@reduxjs/toolkit";
import MenuOptionItem from "../MenuOptionItem";

export default function QuestionPreviewItem({
  id = nanoid(),
  selected = false,
  type = undefined,
  style = {},
  className = "",
  onUpClick = (id) =>
    console.error(
      "No on up click hanlder was passed - QuestionPreviewItem. ID: ",
      id
    ),
  onDownClick = (id) =>
    console.error(
      "No on down click hanlder was passed - QuestionPreviewItem. ID: ",
      id
    ),
  onQuestionDelete = (id) =>
    console.error(
      "No on down click hanlder was passed - onQuestionDelete. ID: ",
      id
    ),
  onClick = (id) =>
    console.error(
      "No on click hanlder was passed - QuestionPreviewItem. ID: ",
      id
    ),
}) {
  let iconName = `${type}.png`;
  if (!type) {
    iconName = undefined;
  }
  return type!=='add' ? (
    <div
      onClick={() => {
        onClick(id);
      }}
      style={{ backgroundColor: SECONDARY, ...style }}
      className={`question-preview-item-cont ${
        selected ? "selected-item" : ""
      } ${className}`}
    >
      <div className="question-preview-item-actions-cont">
        <IconButton
          onClick={() => {
            onUpClick(id);
          }}
          style={{ flex: 1, backgroundColor: ACCENT, borderRadius: "50%" }}
          iconName="up-chevron.png"
          stopPropagation
        />
        <IconBackground big iconName={iconName} />
        <IconButton
          onClick={() => {
            onDownClick(id);
          }}
          style={{ flex: 1, backgroundColor: ACCENT, borderRadius: "50%" }}
          iconName="down-chevron.png"
          stopPropagation
          
        />
      </div>
      <Button stopPropagation onClick={() => onQuestionDelete(id)}>Delete</Button>
    </div>
  ) : (<MenuOptionItem value="Add Question" onClick={onClick} />)
}
