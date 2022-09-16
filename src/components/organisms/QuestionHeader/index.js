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
        imageURL={questions[selected].image ? questions[selected].image[0] : null}
        style={{
          alignSelf: "center",
        }}
      />
    </>
  );
}