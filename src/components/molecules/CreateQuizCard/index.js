import React from "react";

import { PRIMARY } from "../../../styles/colors";
import AppLabel, { TYPES as LABEL_TYPES } from "../../atoms/AppLabel";
import Image, { TYPES } from "../../atoms/Image";

import "./styles.css";

export default function CreateQuizCard({
  onClick = () => console.error("No onClick handler passed - CreateQuizCard"),
  style = {},
  className = "",
}) {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: PRIMARY, ...style }}
      className={` create-quiz-card-cont ${className}`}
    >
      <Image imageName="logo-square.png" type={TYPES.ALMOSTSMALL} />
      <AppLabel isBold type={LABEL_TYPES.SUB_SUB_TITLE}>
        Create Quiz
      </AppLabel>
    </div>
  );
}
