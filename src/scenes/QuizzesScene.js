import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGeneralListener from "../hooks/useGeneralListener";
import QuizzesTemplate from "../templates/QuizzesTemplate";
import { deleteQuiz, getQuizzes, resetState } from "../slices/quizzes.slice";
import useResetNaviagtor from "../hooks/useResetNavigator";
import useLoadingState from "../hooks/useLoadingState";
import useAlertModal from "../hooks/useAlertModal";
import AlertPopUp from "../components/organisms/AlertPopUp";

export default function QuizzesScene() {
  const { accessToken, name } = useSelector((state) => state.auth);
  const { quizzes } = useSelector((state) => state.quizzes);
  const [alertProps, showAlert] = useAlertModal();
  const [dispatcher] = useLoadingState();
  const customNavigator = useResetNaviagtor(resetState);

  /* eslint-disable */
  useEffect(() => {
    if (!accessToken) {
      customNavigator("/signin");
    }
    dispatcher(
      getQuizzes(),
      "Unable to get the quizzes! Please check your internet connection!"
    );
  }, []);
  /* eslint-disable */

  // const handleEditQuiz = (id) => {

  // };
  const handleStartQuiz = (id) => {
    customNavigator(`/class/${id}`);
  };
  const handleDeleteQuiz = (id) => {
    showAlert(
      `Are your sure you want to delete ${
        quizzes.find((quiz) => quiz._id === id).name
      } quiz?`,
      () => {
        dispatcher(deleteQuiz(id), "Unable to delete this quiz, please check your connection!");
      }
    );
  };
  const handleCreateQuiz = () => {
    customNavigator("/profile/quizzes/create");
  };
  const handleRefresh = () =>{
    dispatcher(
      getQuizzes(),
      "Unable to get the quizzes! Please check your internet connection!"
    );
  }

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
        handleRefresh={handleRefresh}
        userName={name}
        quizzes={quizzes}
      />
    </>
  );
}
