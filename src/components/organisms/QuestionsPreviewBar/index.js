import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { PRIMARY } from "../../../styles/colors";
import QuestionPreviewItem from "../../molecules/QuestionPreviewItem";
import "./styles.css";

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
  questions = [{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },{ id: nanoid(), type: "answer" },],
  style = {},
  className = "",
}) {
  const [selected, setSelected] = useState(questions[0].id);
  const handleItemClick = (id)=>{
    console.log('Entered!');
    console.log
    setSelected(id);
    onQuestionSelect(id);
  };
  return (
    <div
      style={{ backgroundColor: PRIMARY, ...style }}
      className={`questions-preview-bar-cont ${className}`}
    >
      {questions.map((question) => (
        <QuestionPreviewItem
          selected={question.id === selected}
          onClick={handleItemClick}
          onDownClick={onQuestionDownClick}
          onUpClick={onQuestionUpClick}
          id={question.id}
          key={question.id}
          type={question.type}
        />
      ))}
    </div>
  );
}
