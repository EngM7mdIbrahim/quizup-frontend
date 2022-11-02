import React, { useEffect } from "react";
import LoginSignupTemplate from "../templates/LoginSignUpTemplate";
import * as yup from "yup";
import { FORM_INPUT_TYPES } from "../components/molecules/Form/constants";
import { useSelector, useDispatch } from "react-redux";
import { signIn, resetState } from "../slices/auth.slice";
import useGeneralListener from "../hooks/useGeneralListener";
import useResetNaviagtor from "../hooks/useResetNavigator";

export default function LoginScene() {
  const { isLoading, errorMessage, accessToken } = useSelector((state) => state.auth);
  useGeneralListener(errorMessage,isLoading);
  const dispatch = useDispatch();
  const customNavigator = useResetNaviagtor(resetState);

  useEffect(() => {
    if (accessToken) {
      customNavigator("/profile/quizzes");
    }
  }, [isLoading, errorMessage, dispatch]);

  const handleLogin = (user) => {
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
      react: true,
      routeText: "Signup then!",
    },
  ];

  return (
    <LoginSignupTemplate
      inputs={inputs}
      onFormSubmit={handleLogin}
      title="What's up, Leader!"
    />
  );
}
