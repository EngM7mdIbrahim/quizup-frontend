import React from "react";
import QuestionOption from "../../molecules/QuestionOption";
import './styles.css'


export default function ShowQuestionOptions({
  
  onQuestionOptionTextChange,
  selected,
  questions,
  onQuestionOptionCorrectSelect,
}) {
  return (
    <div className="question-opts-cont">
      <div className="question-opts-row-cont">
        <QuestionOption
          editable
          letter={0}
          selected={questions[selected].correctAnswer}
          style={{
            flex: 1,
          }}
          value={questions[selected].choices[0]}
          onNewValue={(newValue, id) => {
            onQuestionOptionTextChange(newValue, id, selected);
          }}
          onQuestionOptionCorrectSelect={(letter) =>
            onQuestionOptionCorrectSelect(letter, selected)
          }
        />
        <QuestionOption
          editable
          letter={1}
          selected={questions[selected].correctAnswer}
          style={{
            flex: 1,
          }}
          value={questions[selected].choices[1]}
          onNewValue={(newValue, id) => {
            onQuestionOptionTextChange(newValue, id, selected);
          }}
          onQuestionOptionCorrectSelect={(letter) =>
            onQuestionOptionCorrectSelect(letter, selected)
          }
        />
      </div>
      {questions[selected].choices.length > 2 && (
        <div className="question-opts-row-cont">
          <QuestionOption
            editable
            letter={2}
            selected={questions[selected].correctAnswer}
            style={{
              flex: 1,
            }}
            value={questions[selected].choices[2]}
            onNewValue={(newValue, id) => {
              onQuestionOptionTextChange(newValue, id, selected);
            }}
            onQuestionOptionCorrectSelect={(letter) =>
              onQuestionOptionCorrectSelect(letter, selected)
            }
          />
          <QuestionOption
            editable
            letter={3}
            selected={questions[selected].correctAnswer}
            style={{
              flex: 1,
            }}
            value={questions[selected].choices[3]}
            onNewValue={(newValue, id) => {
              onQuestionOptionTextChange(newValue, id, selected);
            }}
            onQuestionOptionCorrectSelect={(letter) =>
              onQuestionOptionCorrectSelect(letter, selected)
            }
          />
        </div>
      )}
    </div>
  );
}
