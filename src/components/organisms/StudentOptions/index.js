import React, { useState } from "react";
import { WHITE } from "../../../styles/colors";
import IconBackgroundText from "../../atoms/IconBackgroundText";
import "./styles.css";
import StudentOption from "../../molecules/StudentOption";

export default function StudentOptions({
  choices = [0],
  style = {},
  className = "",
  onChoiceClick = (choice) =>
    console.error(
      "No onChoiceClick handler has been has been passed! - StudentOptions. Choice:",
      choices[choice]
    ),
}) {
  const [selected, setSelected] = useState(null);
  return (
    <div
      style={{ ...style }}
      className={`student-running-class-details-choices-cont ${className}`}
    >
      {choices.map((choice) => (
        <StudentOption
          disabled={selected!==null}
          key={choice}
          choice={choice}
          onChoiceClick={(choice) => {
            setSelected(choice);
            onChoiceClick(choice);
          }}
        />
      ))}
    </div>
  );
}
