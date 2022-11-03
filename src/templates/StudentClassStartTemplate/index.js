import React from "react";
import * as yup from "yup";
import Form from "../../components/molecules/Form";
import { FORM_INPUT_TYPES } from "../../components/molecules/Form/constants";
import WhiteBackgroundCard from "../../components/molecules/WhiteBackgroundCard";
import { ACCENT, PRIMARY } from "../../styles/colors";
import "./styles.css";

export default function StudentClassStartTemplate({
  style = {},
  isLoading=false,
  className = "",
  initialPin = "No value",
  onPinSubmit = ({ pin, name }) =>
    console.error(
      "No onPinEnter handler has been has been passed! - RunningClassTemplate. Pin:",
      pin,
      ", Name:",
      name
    ),
}) {
  let inputs = [
    {
      type: FORM_INPUT_TYPES.TEXT,
      value: initialPin,
      placeholder: "Please enter the game pin",
      name: "pin",
      imageSource: "logo-square.png",
      validation: yup
        .number()
        .required("We need the game pin to let you join a room!")
        .typeError("Please enter a 6 digit number!")
        .test("len", "The game pin should be a 6 digit number!", (val) => {
          try {
            return val.toString().length === 6;
          } catch (e) {
            return false;
          }
        }),
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
      <WhiteBackgroundCard>
        <Form
          isLoading={isLoading}
          style={{ flex: 1, justifyContent: "center" }}
          subComponent
          inputs={inputs}
          onSubmit={onPinSubmit}
          submitButtonText="Enter Room!"
          title=""
        />
      </WhiteBackgroundCard>
    </div>
  );
}
