import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { PRIMARY } from "../../../styles/colors";
import AppLabel, {TYPES} from "../../atoms/AppLabel";
import EditLabel, { INPUT_SIZES } from "../../atoms/EditLabel";
import QuestionPreviewItem from "../../molecules/QuestionPreviewItem";
import "./styles.css";

const init_questions = [
  { id: nanoid(), type: "choices" },
  { id: nanoid(), type: "choices" },
  { id: nanoid(), type: "choices" },
  { id: nanoid(), type: "choices" },
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
  onQuestionDelete = (id) =>
    console.error(
      "No on down click hanlder was passed - QuestionsPreviewBar. ID: ",
      id
    ),
  onAddQuestion = () => {
    console.error(
      "No on add question hanlder was passed - QuestionsPreviewBar. ID: "
    );
  },
  onTemplateTagChange = (newValue) => {
    console.error(
      "No on tag change handler! - QuestionsPreviewBar. NewValue: ", newValue
    );
  },
  questions = init_questions,
  style = {},
  className = "",
  selected = init_questions[0].id,
  templateTag = "No tag passed here - QuestionsPreviewBar"
}) {
  return (
    <div
      style={{ backgroundColor: PRIMARY, ...style }}
      className={`questions-preview-bar-cont ${className}`}
    >
      <AppLabel isBold type={TYPES.SUB_SUB_TITLE}>Tag</AppLabel>
      <EditLabel type={INPUT_SIZES.SUB_SUB_TITLE} value={templateTag} onNewValue={onTemplateTagChange}/>
      {questions.map((question, index) => {
        return (
          <QuestionPreviewItem
            selected={index === selected}
            onClick={(id) => {
              question.type === 'add' ? onAddQuestion() : onQuestionSelect(id);
            }}
            onDownClick={onQuestionDownClick}
            onUpClick={onQuestionUpClick}
            onQuestionDelete={onQuestionDelete}
            id={index}
            key={index}
            type={question.type}
          />
        );
      })}
    </div>
  );
}
