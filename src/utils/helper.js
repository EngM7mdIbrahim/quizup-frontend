import { useEffect } from "react";
export const formatDate = (date) => {
  return date.toLocaleDateString("en-us");
};

export const formatMessages = (message) => {
  const newMessage = {
    emailError: message.includes("email") ? message : "",
    passwordError: message.includes("password") ? message : "",
    confirmPasswordError: message.includes("Confirm Password") ? message : "",
    usernameError: message.includes("username") ? message : "",
    errorMessage: message,
  };

  return newMessage;
};

export const isRejectedAction = (action) => {
  return action.type.endsWith("rejected");
};

export const isLoadingAction = (action) => {
  return action.type.endsWith("pending");
};

export const isFulfilledAuthAction = (action) => {
  return (
    (action.type.includes("signin") || action.type.includes("signup")) &&
    action.type.endsWith("fulfilled")
  );
};
