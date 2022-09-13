import React from "react";
import AppLabel from "../../components/atoms/AppLabel";
import EditLabel from "../../components/atoms/EditLabel";
import ImageUpload from "../../components/atoms/ImageUpload";
import QuestionOption from "../../components/molecules/QuestionOption";
import QuestionsPreviewBar from "../../components/organisms/QuestionsPreviewBar";
import "./styles.css";
const QUESTION_TYPES = { CHOICES: "choices", TRUE_FALSE: "true-false" };

export default function CreateQuizTemplate({
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
  selected=0
}) {
  
  const newQuestions = questions.map((question) => ({
    ...question,
    type:
      question.choices.length === 2
        ? QUESTION_TYPES.TRUE_FALSE
        : QUESTION_TYPES.CHOICES,
  }));

  
  return (
    <div
      style={{ flexDirection: "row", ...style }}
      className={`profile-template-page ${className}`}
    >
      <QuestionsPreviewBar selected={selected} questions={newQuestions}/>

      <div className="question-edit-cont border">
        <AppLabel isBold>Create Template</AppLabel>
        <EditLabel isBold />
        <ImageUpload style={{ alignSelf: "center" }} />
        <div className="question-opts-cont">
          <div className="question-opts-row-cont">
            <QuestionOption style={{flex: 1}}/>
            <QuestionOption style={{flex: 1}}/>
          </div>
          {questions[selected].choices.length > 2 && <div className="question-opts-row-cont">
            <QuestionOption style={{flex: 1}}/>
            <QuestionOption style={{flex: 1}}/>
          </div>}
        </div>
      </div>
    </div>
  );
}
