import React from "react";
import Button from "../../components/atoms/Button";
import QuestionChoiceModalPopUp from "../../components/organisms/QuestionChoiceModalPopUp";
import CreateQuizEmptyContainer from "../../components/organisms/CreateQuizEmptyContainer";
import QuestionHeader from "../../components/organisms/QuestionHeader";
import QuestionOptions from "../../components/organisms/QuestionOptions";
import QuestionsPreviewBar from "../../components/organisms/QuestionsPreviewBar";
import "./styles.css";
import EditLabel from "../../components/atoms/EditLabel";
export const QUESTION_TYPES = { CHOICES: "choices", TRUE_FALSE: "true-false" };

export default function CreateQuizTemplate({
  onQuestionUpClick = (id) =>
    console.error(
      "No on up click hanlder was passed - CreateQuizTemplate. ID: ",
      id
    ),
  onQuestionDownClick = (id) =>
    console.error(
      "No on down click hanlder was passed - CreateQuizTemplate. ID: ",
      id
    ),
  onQuestionSelect = (id) =>
    console.error(
      "No on select click hanlder was passed - CreateQuizTemplate. ID: ",
      id
    ),
  onAddQuestion = () =>
    console.error(
      "No on add question hanlder was passed - CreateQuizTemplate. ID: "
    ),
  onQuestionDelete = (id) =>
    console.error(
      "No on delete question click hanlder was passed - CreateQuizTemplate. ID: ",
      id
    ),
  onHideQuestionModal = () =>
    console.error(
      "No on hide question modalclick hanlder was passed - CreateQuizTemplate."
    ),
  onQuestionTitleChange = (newValue, selected) =>
    console.error(
      "No on question title change hanlder was passed - CreateQuizTemplate. Value: ",
      newValue,
      ", Selected: ",
      selected
    ),
  onQuestionImageChange = (image, selected) =>
    console.error(
      "No on question image change hanlder was passed - CreateQuizTemplate. Image: ",
      image,
      ", Selected: ",
      selected
    ),
  onQuestionOptionTextChange = (newValue, optionId, selected) =>
    console.error(
      "No on question option change hanlder was passed - CreateQuizTemplate. Value: ",
      newValue,
      ", Option ID:",
      optionId,
      ", Selected: ",
      selected
    ),
  onQuestionOptionCorrectSelect = (letter, selected) => {
    console.error(
      "No on question option correct select handler! - CreateQuizTemplate. Letter: ",
      letter,
      ", Selected: ",
      selected
    );
  },
  onQuestionClearImage = () =>
  console.error(
    "No on clear image  hanlder was passed - CreateQuizTemplate."
  ),
  onQuestionTypeChoice = (choiceNum) => {
    console.error(
      "No on question type choice handler! - CreateQuizTemplate. ChoicesNum: ",
      choiceNum
    );
  },
  onTemplateSave = () => {
    console.error(
      "No on template save handler! - CreateQuizTemplate."
    );
  },
  onTemplateTitleChange = (newValue) => {
    console.error(
      "No on title change handler! - CreateQuizTemplate. NewValue: ", newValue
    );
  },
  onTemplateTagChange = (newValue) => {
    console.error(
      "No on tag change handler! - CreateQuizTemplate. NewValue: ", newValue
    );
  },
  questions = [
    {
      question: "Test Question 1",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
      correctAnswer: 0,
    },
    {
      question: "Test Question 2",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
      correctAnswer: 1,
    },
    {
      question: "Test Question 3",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
      correctAnswer: null,
    },
    {
      question: "Test Question 4",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
      correctAnswer: 2,
    },
  ],
  style = {},
  className = "",
  selected = 0,
  isQuestionModalShwon = false,
  templateTitle = "No title passed here - CreateQuizTemplate",
  templateTag = "No tag passed here - CreateQuizTemplate"
}) {
  
  return (
    <div
      style={{ flexDirection: "row", ...style }}
      className={`profile-template-page ${className}`}
    >
      <QuestionChoiceModalPopUp
        shown={isQuestionModalShwon}
        onCancel={onHideQuestionModal}
        onQuestionChoice={onQuestionTypeChoice}
      />
      <QuestionsPreviewBar
        onQuestionSelect={onQuestionSelect}
        onQuestionDownClick={onQuestionDownClick}
        onQuestionUpClick={onQuestionUpClick}
        onQuestionDelete={onQuestionDelete}
        onAddQuestion={onAddQuestion}
        onTemplateTagChange={onTemplateTagChange}
        selected={selected}
        questions={questions}
        templateTag = {templateTag}

      />

      <div className="question-edit-cont">
        {questions.length > 1 && (
          <>
            <div className="question-edit-header-cont">
              <EditLabel style={{textAlign: 'left'}} value={templateTitle} onNewValue={onTemplateTitleChange} isBold/>
              <Button onClick={onTemplateSave}>Save Template</Button>
            </div>
            <QuestionHeader
            onClearImage={()=>onQuestionClearImage(selected)}
              onQuestionTitleChange={onQuestionTitleChange}
              selected={selected}
              questions={questions}
              onQuestionImageChange={onQuestionImageChange}
            />
            <QuestionOptions
              questions={questions}
              onQuestionOptionTextChange={onQuestionOptionTextChange}
              selected={selected}
              onQuestionOptionCorrectSelect={onQuestionOptionCorrectSelect}
            />
          </>
        )}
        {questions.length <= 1 && <CreateQuizEmptyContainer />}
      </div>
    </div>
  );
}
