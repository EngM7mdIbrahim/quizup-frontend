import React from "react";
import "./App.css";
import SignupScene from "./scenes/SignupScene";
import LoginScene from "./scenes/LoginScene";
import QuizzesScene from "./scenes/QuizzesScene";

import ProfileScene from "./templates/ProfileScene";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingPopUp from "./components/molecules/LoadingPopUp";
import ErrorPopUp from "./components/molecules/ErrorPopUp";
import { setErrorMessage } from "./slices/general.slice";
import ReportsTemplate from "./templates/ReportsTemplate";

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
          <Route path="/" element={<LoginScene/>} />
          <Route path="/signin" element={<LoginScene />} />
          <Route path="/signup" element={<SignupScene />} />
          <Route path="/profile" element={<ProfileScene />}>
              <Route path="/profile/quizzes" index element={<QuizzesScene/>} />
              <Route path="/profile/reports" index element={<ReportsTemplate/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
