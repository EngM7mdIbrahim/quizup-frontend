import React, { useEffect } from "react";
import LoginSignupTemplate from "../templates/LoginSignUpTemplate";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { FORM_INPUT_TYPES } from "../components/molecules/Form/constants";
import { signUp } from "../slices/auth.slice";
import useCustomNavigator from "../hooks/useCustomNavigator";
import useLoadingState from "../hooks/useLoadingState";

export default function SignupScene() {
  const { accessToken } = useSelector(
    (state) => state.auth
  );
  const [internetDispatcher] = useLoadingState();

  const goTo = useCustomNavigator();

  useEffect(() => {
    if (accessToken) {
      goTo("/profile");
    }
  }, [accessToken, goTo]);

  const handleSignUp = (user) => {
    internetDispatcher(signUp(user), "Cannot sign you up, please check your internet connection!");
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
      react: true,
      routeText: "Signin then!",
    },
  ];
  return (
    <LoginSignupTemplate
      inputs={inputs}
      title="Join us! Become a Leader!"
      onFormSubmit={handleSignUp}
    />
  );
}
