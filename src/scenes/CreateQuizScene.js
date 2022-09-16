import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGeneralListener from "../hooks/useGeneralListener";
import useResetNaviagtor from "../hooks/useResetNaviagtor";
import CreateQuizTemplate, {
  QUESTION_TYPES,
} from "../templates/CreateQuizTemplate";
import { nanoid } from "@reduxjs/toolkit";
import {
  createTemplate,
  resetState,
  setTemplate,
  deleteQuestion,
  changeQuestionTitle,
  changeQuestionImage,
  clearQuestionImage,
  changeQuestionCorrectAns,
  changeQuestionOrder,
  changeQuestionOptionText,
  addNewQuestion,
  changeTemplateTitle
} from "../slices/quizzes.slice";

export default function CreateQuizScene() {
  const { accessToken } = useSelector((state) => state.auth);
  const { isLoading, errorMessage, template } = useSelector(
    (state) => state.quizzes
  );
  useGeneralListener(errorMessage, isLoading);
  const dispatch = useDispatch();
  const customNavigator = useResetNaviagtor(resetState);

  useEffect(() => {
    if (!accessToken) {
      customNavigator("/profile/quizzes");
      console.log("Entered!");
    }
  }, [isLoading, errorMessage, dispatch]);

  const int_questions = [
    {
      id: nanoid(),
      question: "Test Question 1",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
      correctAnswer: 0,
      image: null,
    },
    {
      id: nanoid(),
      question: "Test Question 2",
      choices: ["Choice 1", "Choice 2"],
      correctAnswer: 1,
      image: null,
    },
    {
      id: nanoid(),
      question: "Test Question 3",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
      correctAnswer: null,
      image: null,
    },
    {
      id: nanoid(),
      question: "Test Question 4",
      choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
      correctAnswer: 2,
      image: null,
    },
    { type: "add" },
  ];

  const { questions, showModal, selected, title } = template;

  

  const newQuestions = questions.map((question) => {
    if (question.type === "add") {
      return question;
    }
    return {
      ...question,
      type:
        question.choices.length === 2
          ? QUESTION_TYPES.TRUE_FALSE
          : QUESTION_TYPES.CHOICES,
    };
  });
  return (
    <CreateQuizTemplate
      questions={newQuestions}
      selected={selected}
      isQuestionModalShwon={showModal}
      templateTitle={title}
      onQuestionSelect={(id) =>
        dispatch(setTemplate({ ...template, selected: id }))
      }
      onQuestionDelete={(id) => dispatch(deleteQuestion(id))}
      onQuestionTitleChange={(newTitle, id) =>
        dispatch(changeQuestionTitle({ newTitle, id }))
      }
      onQuestionImageChange={(image, id) =>
        dispatch(changeQuestionImage({ image, id }))
      }
      onQuestionOptionCorrectSelect={(letter, id)=>dispatch(changeQuestionCorrectAns({letter,id}))}
      onQuestionOptionTextChange={(newValue,optionId,id)=>dispatch(changeQuestionOptionText({id,optionId,newValue}))}
      onQuestionUpClick={(index) => {
        dispatch(changeQuestionOrder({index,isUp: true}));
      }}
      onHideQuestionModal={() => {
        dispatch(setTemplate({ ...template, showModal: false }));
      }}
      onAddQuestion={() => {
        dispatch(setTemplate({ ...template, showModal: true }));
      }}
      onQuestionDownClick={(index) => {
        dispatch(changeQuestionOrder({index,isUp: false}));
      }}
      onTemplateSave={()=>dispatch(createTemplate(template))}
      onTemplateTitleChange={(newValue)=>{dispatch(changeTemplateTitle(newValue))}}
      onQuestionTypeChoice={question=>dispatch(addNewQuestion(question))}
      onQuestionClearImage={(selected) => dispatch(clearQuestionImage(selected))}
    />
  );
}
