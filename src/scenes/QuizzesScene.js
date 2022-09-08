import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGeneralListener from "../hooks/useGeneralListener";
import { useNavigate } from "react-router-dom";
import QuizzesTemplate from "../templates/QuizzesTemplate";
import { getQuizzes, resetState } from "../slices/quizzes.slice";
import useResetNaviagtor from "../hooks/useResetNaviagtor";

export default function LoginScene() {
  const { accessToken, name } = useSelector((state) => state.auth);
  const {quizzes,errorMessage, isLoading} = useSelector((state)=>state.quizzes)
  useGeneralListener(errorMessage,isLoading);
  const dispatch = useDispatch();
  const goTo = useNavigate();
  const customNavigator = useResetNaviagtor(resetState);

  useEffect(() => {
    if (!accessToken) {
      customNavigator("/signin");
    }
    dispatch(getQuizzes());
  }, [accessToken, customNavigator, dispatch]);

  // const handleEditQuiz = (id) => {
    
  // };
  // const handleStartQuiz = (id) => {
    
  // };
  // const handleDeleteQuiz = (id) => {
    
  // };
  const handleCreateQuiz = () => {
    customNavigator('/createQuiz')
  };


  return (
    <QuizzesTemplate userName={name} quizzes={quizzes}/>
  );
}
