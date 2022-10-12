import React, { useState } from "react";
import { WHITE } from "../../../styles/colors";
import IconBackgroundText from "../../atoms/IconBackgroundText";
import LoadingIndicator from "../../atoms/LoadingIndicator";
import "./styles.css";

export default function StudentOption({
  style = {},
  choice = 0,
  className = "",
  disabled = false,
  onChoiceClick = (choice) =>
    console.error(
      "No onChoiceClick handler has been has been passed! - StudentOption. Choice:",
      choice
    ),
}) {
  const [isClicked, setClicked] = useState(false);
  return (
    <div
      onClick={() => {
        if (!disabled) {
          setClicked(true);
          onChoiceClick(choice);
        }
      }}
      style={{ backgroundColor: WHITE, ...style }}
      className={`student-running-class-details-choice-cont ${
        !disabled && "hover-animation"
      } ${disabled && "disabled"} ${className}`}
    >
      {!isClicked ? (
        <IconBackgroundText letter={choice} />
      ) : (
        <LoadingIndicator style={{ width: "50px", height: "50px" }} />
      )}
    </div>
  );
}
