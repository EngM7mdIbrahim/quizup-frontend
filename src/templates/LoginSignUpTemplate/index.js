import React from "react";
import "./styles.css";
import { ACCENT, PRIMARY, SECONDARY } from "../../styles/colors";
import Form from "../../components/molecules/Form";
import Image, { TYPES } from "../../components/atoms/Image";
import { FORM_INPUT_TYPES } from "../../components/molecules/Form/constants";

const getInputFunc = (onClick, iconName, backgroundColor) => {
  return {
    type: FORM_INPUT_TYPES.ICON_BUTON,
    iconName,
    onClick,
    backgroundColor,
  };
};

export default function LoginSignupTemplate({
  inputs = undefined,
  title = "No title passed here - LoginSignupTemplate",
  onFormSubmit = (newData) =>
    console.error(
      "No onFormSubmit handler has been has been passed! - LoginSignupTemplate",
      newData
    ),
  showLabels = false,
  onGoogleSignup = undefined,
  onFacebookSignup = undefined,
  onAppleSignup = undefined,
}) {
  let newInputs = [];
  if (inputs) {
    newInputs = [...inputs];
  }
  if (onGoogleSignup) {
    newInputs.push(getInputFunc(onGoogleSignup, "google.png"));
  }
  if (onFacebookSignup) {
    newInputs.push(getInputFunc(onFacebookSignup, "facebook.png", "#4267B2"));
  }
  if (onAppleSignup) {
    newInputs.push(getInputFunc(onAppleSignup, "apple.png", "#444444"));
  }
  return (
    <div style={{ backgroundColor: PRIMARY }} className="page">
      <div
        style={{ backgroundColor: ACCENT, padding: "40px" }}
        className="login-temp-sub-cont"
      >
        <Form
          inputs={newInputs}
          showLabels={showLabels}
          onSubmit={onFormSubmit}
          titleStyle={{ width: "100%", textAlign: "left" }}
          title={title}
        />
      </div>
      <div className="login-signup-temp-im-cont">
        <Image
        style={{width: '100%', height: '100%'}}
          className="login-signup-temp-img"
          imageName="login-background.png"
        />
      </div>
    </div>
  );
}
