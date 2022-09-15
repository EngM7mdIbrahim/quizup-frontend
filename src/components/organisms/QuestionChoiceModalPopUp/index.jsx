import React from "react";
import AppLabel, { TYPES } from "../../atoms/AppLabel";
import "./styles.css";
import IconButton from "../../atoms/IconButton";
import { PRIMARY, SECONDARY } from "../../../styles/colors";
import MenuOptionItem from "../../molecules/MenuOptionItem";

export default function QuestionChoiceModalPopUp({
  shown = false,
  onQuestionChoice = (question) => {
    console.error(
      "No on question choice hanlder passed - QuestionChoiceModalPopUp. Question: ",
      question
    );
  },
  onCancel = () => {
    console.error("No on cancel hanlder passed - QuestionChoiceModalPopUp");
  },
}) {
  return (
    <div
      style={{ flexDirection: "column", gap: "40px" }}
      className={`loading-popup-cont ${shown ? "shown-popup" : ""}`}
    >
      <div style={{ backgroundColor: PRIMARY }} className="alert-box-cont">
        <div className="alert-box-title-cont">
          <AppLabel isBold type={TYPES.SUB_TITLE}>
            Choose a question
          </AppLabel>
          <IconButton
            onClick={onCancel}
            iconName="cross.png"
            backgroundColor={PRIMARY}
          />
        </div>
        <hr style={{ backgroundColor: SECONDARY }} />
        <div className="question-types-options-cont">
          <MenuOptionItem
          style={{width: '200px'}}
            onClick={() => onQuestionChoice(2)}
            value="True / False"
            iconName="true-false.png"
          />
          <MenuOptionItem
          style={{width: '200px'}}
            onClick={() => onQuestionChoice(4)}
            value="Choices"
            iconName="choices.png"
          />
        </div>
      </div>
    </div>
  );
}
