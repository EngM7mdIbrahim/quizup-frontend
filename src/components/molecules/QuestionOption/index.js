import IconButton from "../../atoms/IconButton";
import React from "react";
import { ACCENT, PRIMARY, SECONDARY, WHITE } from "../../../styles/colors";
import EditLabel, { INPUT_SIZES } from "../../atoms/EditLabel";
import AppLabel, { TYPES } from "../../atoms/AppLabel";
import "./styles.css";

const CHOICES = "ABCD";

export default function QuestionOption({
  value = "No value passed here - QuestionOption",
  onQuestionOptionCorrectSelect = (letter)=>{
    console.error(
      "No on question option correct select handler! - QuestionOption. Letter: ",
      letter
    );
  },
  onNewValue = (newValue, letter) => {
    console.error(
      "No on new value handler! - QuestionOption. Value: ",
      newValue
    );
  },
  letter = 0,
  editable = false,
  style = {},
  className = "",
  selected = 0,
}) {
  return (
    <div
      style={{ backgroundColor: !editable ? SECONDARY : PRIMARY, ...style }}
      className={`quest-opt-cont ${className}`}
    >
      <div
        className="question-opt-icon-cont"
        style={{ backgroundColor: ACCENT }}
      >
        <AppLabel isBold style={{ color: WHITE }} type={TYPES.SUB_TITLE}>
          {CHOICES[letter]}
        </AppLabel>
      </div>
      {editable ? (
        <EditLabel
          value={value}
          onNewValue={(newValue)=>onNewValue(newValue, letter)}
          className="question-opt-text"
          type={INPUT_SIZES.PAR}
        />
      ) : (
        <AppLabel className="question-opt-text" type={INPUT_SIZES.PAR}>
          {value}
        </AppLabel>
      )}

      <IconButton
        className="question-opt-icon-cont"
        hidden={selected !== letter}
        iconName="check.png"
        big
        onClick={()=>onQuestionOptionCorrectSelect(letter)}
        style={{
          backgroundColor: !editable ? PRIMARY : SECONDARY,
        }}
      />
    </div>
  );
}
