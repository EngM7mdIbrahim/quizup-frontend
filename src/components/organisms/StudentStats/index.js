import React from "react";
import AppLabel, { TYPES as LABEL_TYPES } from "../../atoms/AppLabel";
import Image, { TYPES } from "../../atoms/Image";
import "./styles.css";

export default function StudentStats({
  correcAnswers = [],
  choices = [],
  style = {},
  className = "",
}) {
  return (
    <div style={{ width: '100%', ...style }} className={` ${className}`}>
      {correcAnswers.map((correctAns, index) => (
        <div key={index}className="student-stats-cont border">
          <Image
            imageName="logo-square.png"
            type={TYPES.UNDEFINED}
            style={{ width: "30px", height: "30px" }}
          />
          <AppLabel style={{flex: 1, textAlign: 'center'}}isBold type={LABEL_TYPES.SUB_SUB_TITLE}>
            Question {index + 1}
          </AppLabel>
          <Image
            imageName={
              choices[index] === correctAns ? "check.png" : "cross.png"
            }
            type={TYPES.UNDEFINED}
            style={{ width: "30px", height: "30px" }}
          />
        </div>
      ))}
    </div>
  );
}
