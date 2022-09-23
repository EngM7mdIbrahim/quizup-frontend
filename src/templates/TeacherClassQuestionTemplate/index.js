import React from "react";
import AppLabel, { TYPES } from "../../components/atoms/AppLabel";
import TeacherClassQuestionHeader from "../../components/organisms/TeacherClassQuestionHeader";
import Image, { TYPES as IMAGE_TYPES } from "../../components/atoms/Image";
import { ACCENT, PRIMARY, WHITE } from "../../styles/colors";
import "./styles.css";
import ChoiceStatsItem from "../../components/molecules/ChoiceStatsItem";
import QuestionOptions from "../../components/organisms/QuestionOptions";

export default function TeacherClassQuestionTemplate({
  style = {},
  className = "",
  //Quesiton Details
  question = "What is the question",
  questionNumber = 1,
  choiceStats = [1, 2, 3, 4, 4],
  choices = [],
  imageName = "Test.jpg",
  waitingAnswers = false,

   //Waiting for players to answer
  duration = 30,
  onTimeEnd = () => {
    console.error(
      "No onTimeEnd handler passed here - TeacherClassQuestionTemplate"
    );
  },

  //Waiting for the teacher to press next and showing the correct answer
  onNextPress = () => {
    console.error(
      "No onNextPress handler passed here - TeacherClassQuestionTemplate"
    );
  },
  correctAnswer = 0
}) {
  return (
    <div
      style={{ backgroundColor: ACCENT, ...style }}
      className={`page running-class-question-cont ${className}`}
    >
      <TeacherClassQuestionHeader
        questionNumber={questionNumber}
        onTimeEnd={onTimeEnd}
        duration={duration}
        waitingAnswers = {waitingAnswers}
        onNextPress={onNextPress}
      />
      <AppLabel style={{ textAlign: "center", color: WHITE }} isBold>
        {question}
        {question.endsWith("?") ? "" : "?"}
      </AppLabel>
      <div className="running-class-question-body">
        {imageName && <Image
          type={IMAGE_TYPES.UNDEFINED}
          style={{ width: "500px", height: "300px" }}
          className="shadow"
          imageName={imageName}
        />}
        <div
          style={{ backgroundColor: PRIMARY }}
          className="running-class-choices-stats-cont"
        >
          {choiceStats.map(
            (score, index) =>
              index !== choiceStats.length - 1 && (
                <ChoiceStatsItem
                  key={index}
                  number={score}
                  choice={index}
                  total={choiceStats[choiceStats.length - 1]}
                  barColor={ACCENT}
                />
              )
          )}
        </div>
      </div>
      <QuestionOptions
              showCorrectAnswer={!waitingAnswers}
              correctAnswer={correctAnswer}
              choices={choices}
            />
    </div>
  );
}
