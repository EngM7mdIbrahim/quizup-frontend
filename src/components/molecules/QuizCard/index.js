import React from "react";
import { ACCENT, PRIMARY } from "../../../styles/colors";
import AppLabel, { TYPES } from "../../atoms/AppLabel";
import Image, { TYPES as IMAGE_TYPES } from "../../atoms/Image";
import UserRecord from "../UserRecord";
import "./styles.css";
import Button from "../../atoms/Button";
import { nanoid } from "@reduxjs/toolkit";
import IconButton from "../../atoms/IconButton";

export default function QuizCard({
  style = {},
  id = nanoid(),
  templateTitle = "No quiz title passed here - QuizCard",
  courseTitle = "No course title passed here - QuizCard",
  userName = "No user name passed here - QuizCard",
  lastModified = "No last modified passed here - QuizCard",
  className = "",
  onEditClick = () => {
    console.error("No edit handler passed - QuizCard. ID: ", id);
  },
  onStartClick = () => {
    console.error("No start handler passed - QuizCard. ID: ", id);
  },
  onDeleteClick = () => {
    console.error("No delete handler passed - QuizCard. ID: ", id);
  },
}) {
  return (
    <div
      style={{ backgroundColor: PRIMARY, ...style }}
      className={`quiz-card-cont ${className}`}
    >
      <Image imageName="logo-square.png" type={IMAGE_TYPES.ALMOSTSMALL} />
      <div className=" quiz-card-details-cont">
        <AppLabel isBold type={TYPES.SUB_TITLE}>
          {templateTitle}
        </AppLabel>
        <AppLabel style={{ flex: 1 }} type={TYPES.PAR}>
          {courseTitle}
        </AppLabel>
        <div className=" quiz-card-details-bottom-cont">
          <UserRecord tag={userName} />
          <AppLabel type={TYPES.PAR}>
            Last Modified: {lastModified}
          </AppLabel>
        </div>
      </div>
      <div className="quiz-card-actions-cont">
        <Button isPrimary onClick={() => onEditClick(id)}>
          Edit
        </Button>
        <Button isPrimary onClick={() => onStartClick(id)}>
          Start
        </Button>
        <IconButton
          onClick={() => onDeleteClick(id)}
          className="quiz-card-delete-btn"
          iconName="recycling-bin.png"
          backgroundColor={ACCENT}
        />
      </div>
    </div>
  );
}
