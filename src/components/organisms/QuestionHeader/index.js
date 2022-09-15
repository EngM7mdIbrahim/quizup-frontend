import React from "react";
import EditLabel from "../../atoms/EditLabel";
import ImageUpload from "../../atoms/ImageUpload";
import './styles.css'

export default function QuestionHeader({
  questions,
  onQuestionTitleChange,
  selected,
  onQuestionImageChange,
  onClearImage
}) {
  return (
    <>
      <EditLabel
        value={questions[selected].question}
        onNewValue={(newValue) => {
          onQuestionTitleChange(newValue, selected);
        }}
        isBold
      />
      <ImageUpload
      onClearImage={onClearImage}
        onNewImage={(image) => {
          onQuestionImageChange(image, selected);
        }}
        image={questions[selected].image}
        style={{
          alignSelf: "center",
        }}
      />
    </>
  );
}