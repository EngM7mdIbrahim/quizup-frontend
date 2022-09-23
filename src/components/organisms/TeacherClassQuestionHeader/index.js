import React from "react";
import { WHITE } from "../../../styles/colors";
import AppLabel from "../../atoms/AppLabel";
import Timer from "../../molecules/Timer";
import "./styles.css";
import Image, { TYPES as IMAGE_TYPES } from "../../atoms/Image";
import Button from "../../atoms/Button";

export default function TeacherClassQuestionHeader({
  style = {},
  className = "",
  duration = 30,
  waitingAnswers = false,

  questionNumber = "No question number passed here - TeacherClassQuestionHeader",
  onTimeEnd = () => {
    console.error(
      "No onTimeEnd handler passed here - TeacherClassQuestionHeader"
    );
  },
  onNextPress = () => {
    console.error(
      "No onNextPress handler passed here - TeacherClassQuestionHeader"
    );
  },
}) {
  return (
    <div
      style={{ ...style }}
      className={`running-class-question-header ${className}`}
    >
      <div className="running-class-question-header-text-cont">
        <Image
          isContain
          type={IMAGE_TYPES.UNDEFINED}
          style={{
            height: "70px",
          }}
          imageName="logo-white.png"
        />
        <AppLabel
          isBold
          style={{
            marginRight: "20px",
            color: WHITE,
          }}
        >
          Question {questionNumber}:
        </AppLabel>
      </div>
      {waitingAnswers ? (
        <Timer duration={duration} onTimeEnd={onTimeEnd} />
      ) : (
        <Button style={{width: '150px'}} isPrimary={false} onClick={onNextPress}>Next</Button>
      )}
    </div>
  );
}
