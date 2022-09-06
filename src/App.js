import React, { useEffect } from "react";
import "./App.css";
import SignupScene from "./scenes/SignupScene";
import LoginScene from "./scenes/LoginScene";

import ProfileTemplate from "./templates/ProfileTemplate";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingPopUp from "./components/molecules/LoadingPopUp";
import ErrorPopUp from "./components/molecules/ErrorPopUp";
import { setErrorMessage } from "./slices/general.slice";
import LoginSignupTemplate from "./templates/LoginSignUpTemplate";

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
          <Route path="/profile/:component" element={<ProfileTemplate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
