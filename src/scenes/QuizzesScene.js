import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGeneralListener from "../hooks/useGeneralListener";
import QuizzesTemplate from "../templates/QuizzesTemplate";
import { deleteQuiz, getQuizzes, resetState } from "../slices/quizzes.slice";
import useResetNaviagtor from "../hooks/useResetNavigator";
import useAlertModal from "../hooks/useAlertModal";
import AlertPopUp from "../components/organisms/AlertPopUp";

export default function QuizzesScene() {
  const { accessToken, name } = useSelector((state) => state.auth);
  const { quizzes, errorMessage, isLoading } = useSelector(
    (state) => state.quizzes
  );
  const [alertProps, showAlert] = useAlertModal();
  useGeneralListener(errorMessage, isLoading);
  const dispatch = useDispatch();
  const customNavigator = useResetNaviagtor(resetState);

  /* eslint-disable */
  useEffect(() => {
    if (!accessToken) {
      customNavigator("/signin");
    }
    dispatch(getQuizzes());
  }, []);
  /* eslint-disable */

  // const handleEditQuiz = (id) => {

  // };
  const handleStartQuiz = (id) => {
    customNavigator(`/class/${id}`)
  };
  const handleDeleteQuiz = (id) => {
    showAlert(
      `Are your sure you want to delete ${quizzes.find(quiz=>quiz._id === id).name} quiz?`,
      () => {
        dispatch(deleteQuiz(id));
      }
    );
  };
  const handleCreateQuiz = () => {
    customNavigator("/profile/quizzes/create");
  };

  return (
    <>
      <AlertPopUp
        alertMessage={alertProps.message}
        onCancel={alertProps.onCancel}
        onConfirm={alertProps.onConfirm}
      />
      <QuizzesTemplate
        handleQuizDelete={handleDeleteQuiz}
        handleCreateQuiz={handleCreateQuiz}
        handleQuizStart={handleStartQuiz}
        userName={name}
        quizzes={quizzes}
      />
    </>
  );
}
