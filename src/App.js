import React from "react";
import "./App.css";
import SignupScene from "./scenes/SignupScene";
import LoginScene from "./scenes/LoginScene";
import QuizzesScene from "./scenes/QuizzesScene";

import ProfileScene from "./templates/ProfileScene";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingPopUp from "./components/organisms/LoadingPopUp";
import ErrorPopUp from "./components/organisms/ErrorPopUp";
import { setErrorMessage } from "./slices/general.slice";
import ClassesScene from "./scenes/ClassesScene";
import SingleClassScene from "./scenes/SingleClassScene";
import CreateQuizScene from "./scenes/CreateQuizScene";
import TeacherClassScene from "./scenes/TeacherClassScene";
import StudentClassScene from "./scenes/StudentClassScene";

function App() {
  const { isLoading, errorMessage } = useSelector((state) => state.general);
  const dispatch = useDispatch();

  return (
    <>
      <ErrorPopUp
        errorMessage={errorMessage}
        onClick={() => {
          dispatch(setErrorMessage(""));
        }}
      />
      <LoadingPopUp isLoading={isLoading} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScene />} />
          <Route path="/signin" element={<LoginScene />} />
          <Route path="/signup" element={<SignupScene />} />
          <Route path="/profile" element={<ProfileScene />}>
            <Route path="/profile/quizzes" index element={<QuizzesScene />} />
            <Route
              path="/profile/quizzes/create"
              index
              element={<CreateQuizScene />}
            />
            <Route path="/profile/reports" element={<ClassesScene />} />
            <Route path="/profile/reports/:id" element={<SingleClassScene />} />
          </Route>
          <Route path="/class/:quizID" element={<TeacherClassScene />} />
          <Route path="/student/:pin" element={<StudentClassScene />} />
          <Route path="/student/" element={<StudentClassScene />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
