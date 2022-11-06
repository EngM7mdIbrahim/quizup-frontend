import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGeneralListener from "../hooks/useGeneralListener";
import useResetNaviagtor from "../hooks/useResetNavigator";
import CreateQuizTemplate, {
  QUESTION_TYPES,
} from "../templates/CreateQuizTemplate";
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
  changeTemplateTitle,
  changeTemplateTag,
} from "../slices/quizzes.slice";
import { useParams } from "react-router-dom";
import useLoadingState from "../hooks/useLoadingState";

export default function CreateQuizScene() {
  const { accessToken } = useSelector((state) => state.auth);
  const { isLoading, errorMessage, template, quizzes, addedQuiz } = useSelector(
    (state) => state.quizzes
  );
  useGeneralListener(errorMessage, isLoading);
  const [dispatcher] = useLoadingState();
  const dispatch = useDispatch();
  const customNavigator = useResetNaviagtor(resetState);
  const { id } = useParams();
  if (id && quizzes[id]) {
    dispatch(setTemplate(quizzes[id]));
  }

  useEffect(() => {
    if (!accessToken || addedQuiz) {
      customNavigator("/profile/quizzes");
    }
  }, [isLoading, errorMessage, dispatch]);

  const { questions, showModal, selected, name, tag } = template;
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
      templateTitle={name}
      templateTag={tag}
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
      onQuestionOptionCorrectSelect={(letter, id) =>
        dispatch(changeQuestionCorrectAns({ letter, id }))
      }
      onQuestionOptionTextChange={(newValue, optionId, id) =>
        dispatch(changeQuestionOptionText({ id, optionId, newValue }))
      }
      onQuestionUpClick={(index) => {
        dispatch(changeQuestionOrder({ index, isUp: true }));
      }}
      onHideQuestionModal={() => {
        dispatch(setTemplate({ ...template, showModal: false }));
      }}
      onAddQuestion={() => {
        dispatch(setTemplate({ ...template, showModal: true }));
      }}
      onQuestionDownClick={(index) => {
        dispatch(changeQuestionOrder({ index, isUp: false }));
      }}
      onTemplateSave={() =>
        dispatcher(
          createTemplate(template),
          "Cannot save the quiz, please check your internet connection!"
        )
      }
      onTemplateTitleChange={(newValue) => {
        dispatch(changeTemplateTitle(newValue));
      }}
      onTemplateTagChange={(newValue) => {
        dispatch(changeTemplateTag(newValue));
      }}
      onQuestionTypeChoice={(question) => dispatch(addNewQuestion(question))}
      onQuestionClearImage={(selected) =>
        dispatch(clearQuestionImage(selected))
      }
    />
  );
}
