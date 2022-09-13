import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { PRIMARY } from "../../../styles/colors";
import QuestionPreviewItem from "../../molecules/QuestionPreviewItem";
import "./styles.css";

const init_questions = [
  { id: nanoid(), type: "answer" },
  { id: nanoid(), type: "answer" },
  { id: nanoid(), type: "answer" },
  { id: nanoid(), type: "answer" },
];

export default function QuestionsPreviewBar({
  onQuestionUpClick = (id) =>
    console.error(
      "No on up click hanlder was passed - QuestionsPreviewBar. ID: ",
      id
    ),
  onQuestionDownClick = (id) =>
    console.error(
      "No on down click hanlder was passed - QuestionsPreviewBar. ID: ",
      id
    ),
  onQuestionSelect = (id) =>
    console.error(
      "No on select click hanlder was passed - QuestionsPreviewBar. ID: ",
      id
    ),
  questions = init_questions,
  style = {},
  className = "",
  selected = init_questions[0].id,
  setSelected=(selected) =>{console.error(
    "No on set selected hanlder was passed - QuestionsPreviewBar. ID: ",
    selected
  )}
}) {
  const handleItemClick = (id) => {
    setSelected(id);
    onQuestionSelect(id);
  };
  console.log(questions)
  return (
    <div
      style={{ backgroundColor: PRIMARY, ...style }}
      className={`questions-preview-bar-cont ${className}`}
    >
      {questions.map((question, index) => {
        return (
          <QuestionPreviewItem
            selected={index === selected}
            onClick={handleItemClick}
            onDownClick={onQuestionDownClick}
            onUpClick={onQuestionUpClick}
            id={index}
            key={index}
            type={question.type}
          />
        );
      })}
    </div>
  );
}
