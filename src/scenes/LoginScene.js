import React, { useEffect } from "react";
import LoginSignupTemplate from "../templates/LoginSignUpTemplate";
import * as yup from "yup";
import { FORM_INPUT_TYPES } from "../components/molecules/Form/constants";
import { useSelector, useDispatch } from "react-redux";
import { signIn, resetState } from "../slices/auth.slice";
import useGeneralListener from "../hooks/useGeneralListener";
import { useNavigate } from "react-router-dom";

const handleAppleSignup = () => alert("Under Construction!");
const handleFacebookSignup = () => alert("Under Construction!");
const handleGoogleSignup = () => alert("Under Construction!");
export default function LoginScene() {
  const { isLoading, errorMessage, accessToken } = useSelector((state) => state.auth);
  useGeneralListener(errorMessage,isLoading);
  const dispatch = useDispatch();
  const goTo = useNavigate();

  useEffect(() => {
    if (accessToken) {
      dispatch(resetState());
      goTo("/profile/templates");
    }
  }, [isLoading, errorMessage, dispatch]);

  const handleLogin = (user) => {
    console.log("User: ", user);
    dispatch(signIn(user));
  };

  const inputs = [
    {
      type: FORM_INPUT_TYPES.TEXT,
      value: "",
      placeholder: "Please enter your email",
      name: "email",
      imageSource: "email.png",
      validation: yup
        .string()
        .required("Email is required!")
        .email("You should enter a valid email!"),
    },
    {
      type: FORM_INPUT_TYPES.PASSWORD,
      value: "",
      placeholder: "Please enter your password",
      name: "password",
      imageSource: "lock.png",
      validation: yup
        .string()
        .required("Password is required!")
        .min(8, "Your password should be 8 characters long or more!"),
    },
    {
      type: FORM_INPUT_TYPES.LINK,
      text: "Don't have an account?",
      route: "/signup",
      routeText: "Signup then!",
    },
  ];

  return (
    <LoginSignupTemplate
      inputs={inputs}
      onFormSubmit={handleLogin}
      title="What's up, Leader!"
      // onAppleSignup={handleAppleSignup}
      // onGoogleSignup={handleGoogleSignup}
      // onFacebookSignup={handleFacebookSignup}
    />
  );
}
