import React from "react";
import QuestionOption from "../../molecules/QuestionOption";
import "./styles.css";

export default function QuestionOptions({
  editable = false,
  //Non Editable Options
  showCorrectAnswer = false,
  choices = [
    "No choice passed - QuestionOptions",
    "No choice passed - QuestionOptions",
  ],
  correctAnswer = 0,

  //Editable Question Options
  onQuestionOptionTextChange,
  selected,
  questions,
  onQuestionOptionCorrectSelect,
}) {
  const shouldHave2Rows = editable
    ? questions[selected].choices.length > 2
    : choices.length > 2;
  return (
    <div className="question-opts-cont">
      <div className="question-opts-row-cont">
        <QuestionOption
          editable={editable}
          letter={0}
          selected={editable ? questions[selected].correctAnswer : correctAnswer}
          style={{
            flex: 1,
          }}
          value={editable ? questions[selected].choices[0] : choices[0]}
          onNewValue={(newValue, id) => {
            onQuestionOptionTextChange(newValue, id, selected);
          }}
          onQuestionOptionCorrectSelect={(letter) =>
            onQuestionOptionCorrectSelect(letter, selected)
          }
          showAnswers={showCorrectAnswer}
        />
        <QuestionOption
          editable={editable}
          letter={1}
          selected={editable ? questions[selected].correctAnswer : correctAnswer}
          style={{
            flex: 1,
          }}
          value={editable ? questions[selected].choices[1] : choices[1]}
          onNewValue={(newValue, id) => {
            onQuestionOptionTextChange(newValue, id, selected);
          }}
          onQuestionOptionCorrectSelect={(letter) =>
            onQuestionOptionCorrectSelect(letter, selected)
          }
          showAnswers={showCorrectAnswer}
        />
      </div>
      {shouldHave2Rows && (
        <div className="question-opts-row-cont">
          <QuestionOption
            editable={editable}
            letter={2}
            selected={editable ? questions[selected].correctAnswer : correctAnswer}
            style={{
              flex: 1,
            }}
            value={editable ? questions[selected].choices[2] : choices[2]}
            onNewValue={(newValue, id) => {
              onQuestionOptionTextChange(newValue, id, selected);
            }}
            onQuestionOptionCorrectSelect={(letter) =>
              onQuestionOptionCorrectSelect(letter, selected)
            }
            showAnswers={showCorrectAnswer}
          />
          <QuestionOption
            editable={editable}
            letter={3}
            selected={editable ? questions[selected].correctAnswer : correctAnswer}
            style={{
              flex: 1,
            }}
            value={editable ? questions[selected].choices[3] : choices[3]}
            onNewValue={(newValue, id) => {
              onQuestionOptionTextChange(newValue, id, selected);
            }}
            onQuestionOptionCorrectSelect={(letter) =>
              onQuestionOptionCorrectSelect(letter, selected)
            }
            showAnswers={showCorrectAnswer}
          />
        </div>
      )}
    </div>
  );
}
