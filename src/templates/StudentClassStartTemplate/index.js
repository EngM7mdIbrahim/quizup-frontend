import React from "react";
import * as yup from "yup";
import Image, { TYPES } from "../../components/atoms/Image";
import Form from "../../components/molecules/Form";
import { FORM_INPUT_TYPES } from "../../components/molecules/Form/constants";
import { ACCENT, PRIMARY } from "../../styles/colors";
import "./styles.css";

export default function StudentClassStartTemplate({
  style = {},
  className = "",
  onPinSubmit = ({ pin, name }) =>
    console.error(
      "No onPineEnter handler has been has been passed! - RunningClassTemplate. Pin:",
      pin,
      ", Name:",
      name
    ),
}) {
  const inputs = [
    {
      type: FORM_INPUT_TYPES.TEXT,
      value: "",
      placeholder: "Please enter the game pin",
      name: "pin",
      imageSource: "logo-square.png",
      validation: yup
        .number()
        .typeError("Please enter a 6 digit number!")
        .required("We need the game pin to let you join a room!")
        .test(
          "len",
          "The game pin should be a 6 digit number!",
          (val) => val.toString().length === 6
        ),
    },
    {
      type: FORM_INPUT_TYPES.TEXT,
      value: "",
      placeholder: "Please enter your name",
      name: "name",
      imageSource: "user.png",
      validation: yup
        .string()
        .required("Please enter your name as to be shown to other players!"),
    },
  ];
  return (
    <div
      style={{ backgroundColor: ACCENT, ...style }}
      className={`page running-class-cont ${className}`}
    >
      <div
        style={{ backgroundColor: PRIMARY }}
        className="student-running-class-details-cont"
      >
        <Image
          className="student-running-class-logo"
          type={TYPES.UNDEFINED}
          style={{
            width: undefined,
            height: "70px",
            objectFit: "contain",
          }}
          imageName="logo.png"
        />

        <Form
          style={{ flex: 1, justifyContent: "center" }}
          subComponent
          inputs={inputs}
          onSubmit={onPinSubmit}
          submitButtonText="Enter Room!"
          title=""
        />
      </div>
    </div>
  );
}
