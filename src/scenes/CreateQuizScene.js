import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGeneralListener from "../hooks/useGeneralListener";
import useResetNaviagtor from "../hooks/useResetNaviagtor";
import CreateQuizTemplate, {
  QUESTION_TYPES,
} from "../templates/CreateQuizTemplate";
import { nanoid } from "@reduxjs/toolkit";
import { constructChoicesArray } from "../utils/helper";
import {
  createTemplate,
  resetState,
  setTemplate,
  deleteQuestion,changeQuestionTitle
} from "../slices/quizzes.slice";

const QUESTION_SCHEME = {
  question: "What is your question",
  image: null,
  choices: [
    "Write Choice 1",
    "Write Choice 2",
    "Write Choice 3",
    "Write Choice 4",
  ],
  correctAnswer: 0,
};

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

  const { questions, showModal, selected } = template;


  const handleQuestionImageChange = (image, id) => {
    let newQuestions = [...questions];
    newQuestions[id].image = image;
    dispatch(setTemplate({ ...template, questions: newQuestions }));
  };

  const handleQuestionOptionCorrectSelect = (letter, id) => {
    let newQuestions = [...questions];
    newQuestions[id].correctAnswer = letter;
    dispatch(setTemplate({ ...template, questions: newQuestions }));
  };

  const handleQuestionOptionTextChange = (newValue, optionId, id) => {
    let newQuestions = [...questions];
    newQuestions[id].choices[optionId] = newValue;
    dispatch(setTemplate({ ...template, questions: newQuestions }));
  };

  const handleQuestionUpDownClick = (index, isUp) => {
    let newQuestions = [...questions];
    let change = isUp
      ? index !== 0
        ? -1
        : 0
      : index !== questions.length - 1
      ? 1
      : 0;
    const newSelected = index + change;
    const [question] = newQuestions.splice(index, 1);
    newQuestions.splice(newSelected, 0, question);
    dispatch(
      setTemplate({
        ...template,
        selected: newSelected,
        questions: newQuestions,
      })
    );
  };

  const handleQuestionChoice = (question) => {
    let newQuestions = [...questions];
    console.log(newQuestions);
    const [add_question] = newQuestions.splice(questions.length - 1, 1);
    let newQuestion = {
      ...QUESTION_SCHEME,
      choices: constructChoicesArray(question),
    };
    dispatch(
      setTemplate({
        ...template,
        showModal: false,
        questions: [...newQuestions, newQuestion, add_question],
      })
    );
  };

  const handleTemplateSave = () => {
    const template = {
      name: "Test Template react 1",
      tag: "test tag 1",
      questions,
    };
    dispatch(createTemplate(template));
  };

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
      onQuestionSelect={(id) =>
        dispatch(setTemplate({ ...template, selected: id }))
      }
      onQuestionDelete={(id)=>dispatch(deleteQuestion(id))}
      onQuestionTitleChange={(newTitle, id)=>(dispatch(changeQuestionTitle({newTitle,id})))}
      onQuestionImageChange={handleQuestionImageChange}
      onQuestionOptionCorrectSelect={handleQuestionOptionCorrectSelect}
      onQuestionOptionTextChange={handleQuestionOptionTextChange}
      onQuestionUpClick={(id) => {
        handleQuestionUpDownClick(id, true);
      }}
      onHideQuestionModal={() => {
        dispatch(setTemplate({ ...template, showModal: false }));
      }}
      onAddQuestion={() => {
        dispatch(setTemplate({ ...template, showModal: true }));
      }}
      onQuestionDownClick={(id) => {
        handleQuestionUpDownClick(id, false);
      }}
      onTemplateSave={handleTemplateSave}
      onQuestionTypeChoice={handleQuestionChoice}
    />
  );
}
