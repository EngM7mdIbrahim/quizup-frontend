import React, { useEffect } from "react";
import LoginSignupTemplate from "../templates/LoginSignUpTemplate";
import { useSelector, useDispatch } from "react-redux";
import useGeneralListener from "../hooks/useGeneralListener";
import * as yup from "yup";
import { FORM_INPUT_TYPES } from "../components/molecules/Form/constants";
import { resetState, signUp } from "../slices/auth.slice";
import { useNavigate } from "react-router-dom";

const handleAppleSignup = () => alert("Under Construction!");
const handleFacebookSignup = () => alert("Under Construction!");
const handleGoogleSignup = () => alert("Under Construction!");

export default function SignupScene() {
  const { isLoading, errorMessage, accessToken} = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useGeneralListener(errorMessage, isLoading);
  const goTo = useNavigate();

  useEffect(() => {
    if (accessToken) {
      dispatch(resetState());
      goTo("/profile");
    }
  }, [isLoading, errorMessage, accessToken, dispatch]);

  const handleSignUp = (user) => {
    dispatch(signUp(user));
  };

  const inputs = [
    {
      type: FORM_INPUT_TYPES.TEXT,
      value: "",
      placeholder: "Please enter your name",
      name: "name",
      imageSource: "user.png",
      validation: yup.string().required("Your name is required!"),
    },
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
      type: FORM_INPUT_TYPES.PASSWORD,
      value: "",
      placeholder: "Please confirm your password",
      name: "confirmPassword",
      imageSource: "lock.png",
      validation: yup
        .string()
        .required("You should confirm your password!")
        .oneOf([yup.ref("password"), null], "Passwords must match!"),
    },
    {
      type: FORM_INPUT_TYPES.LINK,
      text: "You are already a dealer?",
      route: "/signin",
      routeText: "Signin then!",
    },
  ];
  return (
    <LoginSignupTemplate
      inputs={inputs}
      title="Join us! Become a Leader!"
      // onAppleSignup={handleAppleSignup}
      // onGoogleSignup={handleGoogleSignup}
      // onFacebookSignup={handleFacebookSignup}
      onFormSubmit={handleSignUp}
    />
  );
}
