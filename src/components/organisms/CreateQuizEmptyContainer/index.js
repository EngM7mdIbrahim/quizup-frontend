import React from "react";
import AppLabel, { TYPES } from "../../atoms/AppLabel";
import Image from "../../atoms/Image";
import './styles.css'


export default function CreateQuizEmptyContainer({}) {
  return (
    <div className="create-quiz-empty">
      <Image imageName="recycling-bin.png" />
      <AppLabel
        style={{
          textAlign: "center",
        }}
        isBold
        type={TYPES.SUB_TITLE}
      >
        {" "}
        Press Add Question to add some questions to your quiz template!
      </AppLabel>
    </div>
  );
}
