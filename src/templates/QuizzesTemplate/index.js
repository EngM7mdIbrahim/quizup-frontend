import React from "react";
import AppLabel from "../../components/atoms/AppLabel";
import Button from "../../components/atoms/Button";
import CreateQuizCard from "../../components/molecules/CreateQuizCard";
import QuizCard from "../../components/molecules/QuizCard";
import "./styles.css";

export default function QuizzesTemplate({
  style = {},
  className = "",
  quizzes = undefined,
  userName = "No user name passed here - QuizzesTemplate",
  handleQuizEdit = (id) => {
    console.error("No edit handler passed - QuizzesTemplate. ID: ", id);
  },
  handleQuizStart = (id) => {
    console.error("No start handler passed - QuizzesTemplate. ID: ", id);
  },
  handleQuizDelete = (id) => {
    console.error("No delete handler passed - QuizzesTemplate. ID: ", id);
  },
  handleCreateQuiz = () => {
    console.error("No create quiz handler passed - QuizzesTemplate");
  },
  handleRefresh = () => {
    console.error("No refresh handler passed - QuizzesTemplate");
  },
}) {
  return (
    <div
      style={{ ...style }}
      className={`quizzes-temp-cont profile-template-page ${className}`}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleRefresh}>Refresh!</Button>
      </div>
      <AppLabel isBold>Templates</AppLabel>
      {quizzes &&
        quizzes.map((quiz) => {
          return (
            <QuizCard
              userName={userName}
              templateTitle={quiz.name}
              courseTitle={quiz.tag}
              lastModified={quiz.lastEdit}
              id={quiz._id}
              key={quiz._id}
              onEditClick={handleQuizEdit}
              onStartClick={handleQuizStart}
              onDeleteClick={handleQuizDelete}
            />
          );
        })}
      <CreateQuizCard onClick={handleCreateQuiz} />
    </div>
  );
}
