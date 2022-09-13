import IconButton from "../../atoms/IconButton";
import React from "react";
import { ACCENT, PRIMARY, SECONDARY, WHITE } from "../../../styles/colors";
import EditLabel, { INPUT_SIZES } from "../../atoms/EditLabel";
import AppLabel, { TYPES } from "../../atoms/AppLabel";
import "./styles.css";

const CHOICES = "ABCD";

export default function QuestionOption({
  value = "No value passed here - QuestionOption",
  onNewValue = (newValue) => {
    console.error("No on new value handler! - QuestionOption", newValue);
  },
  letter = 0,
  editable = false,
  game = false,
  style = {},
  className = "",
  selected = true,
}) {
  return (
    <div
      style={{ backgroundColor: game ? SECONDARY : PRIMARY, ...style }}
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
          onNewValue={onNewValue}
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
        hidden={!selected}
        iconName="check.png"
        big
        style={{
          backgroundColor: game ? PRIMARY : SECONDARY,
        }}
      />
    </div>
  );
}