import React from "react";
import {WHITE } from "../../../styles/colors";
import IconBackgroundText from "../../atoms/IconBackgroundText";
import "./styles.css";

export default function StudentOptions({
  choices = [0],
  style = {},
  className = "",
  title = "No title has been has been passed! - StudentOptions",
  onChoiceClick = (choice) =>
    console.error(
      "No onChoiceClick handler has been has been passed! - StudentOptions. Choice:",
      choices[choice]
    ),
}) {
  return (
    <div
      style={{ ...style }}
      className={`student-running-class-details-choices-cont ${className}`}
    >
      
      
      {choices.map((choice) => (
        <div
        onClick={()=>onChoiceClick(choice)}
          style={{
            backgroundColor: WHITE,
          }}
          className="student-running-class-details-choice-cont"
        >
          <IconBackgroundText letter={choice}  />
        </div>
      ))}
      
    </div>
  );
}
