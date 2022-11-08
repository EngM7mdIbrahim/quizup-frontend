import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import QuizzesTemplate from "../templates/QuizzesTemplate";
import { deleteQuiz, getQuizzes } from "../slices/quizzes.slice";
import useLoadingState from "../hooks/useLoadingState";
import useAlertModal from "../hooks/useAlertModal";
import AlertPopUp from "../components/organisms/AlertPopUp";
import { useNavigate } from "react-router-dom";

export default function QuizzesScene() {
  const { accessToken, name } = useSelector((state) => state.auth);
  const { quizzes } = useSelector((state) => state.quizzes);
  const [alertProps, showAlert] = useAlertModal();
  const [dispatcher] = useLoadingState();
  const goTo = useNavigate();

  /* eslint-disable */
  useEffect(() => {
    if (!accessToken) {
      goTo("/signin");
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
    goTo(`/class/${id}`);
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
    goTo("/profile/quizzes/create");
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
