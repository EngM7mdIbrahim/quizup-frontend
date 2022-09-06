import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import {
  constructValidationSchema,
  getInitialValues,
  getInput,
} from "./helper";
import "./styles.css";
import Button from "../../atoms/Button";
import { EXAMPLE_INPUTS, FORM_INPUT_TYPES } from "./constants";
import { PRIMARY, SECONDARY } from "../../../styles/colors";
import AppLabel, { TYPES } from "../../atoms/AppLabel";
import Image, { TYPES as IMAGE_TYPES } from "../../atoms/Image";
import IconButton from "../../atoms/IconButton";

export default function Form({
  style = {},
  titleStyle = {},
  className = "",
  showLabels = false,
  inputs = EXAMPLE_INPUTS,
  titleImageName = "logo.png",
  title = "No title for this form - Form",
  onSubmit = (newData) => console.error("No on submit handler - Form", newData),
}) {
  const formik = useFormik({
    initialValues: getInitialValues(inputs),
    validationSchema: constructValidationSchema(inputs),
    onSubmit,
  });
  return (
    <div
      style={{ backgroundColor: SECONDARY, ...style }}
      className={`card login-form-temp ${className}`}
    >
      <Image
      isContain
        style={{ alignSelf: "center" }}
        imageName={titleImageName}
        type={IMAGE_TYPES.EXTRALARGE}
      />
      <AppLabel style={titleStyle} isBold type={TYPES.TITLE}>
        {title}
      </AppLabel>
      <div className="form-inputs-cont">
        {inputs.map((input) => {
          input.value = formik.values[input.name];
          input.errorMessage =
            formik.touched[input.name] && formik.errors[input.name]
              ? formik.errors[input.name]
              : "";
          input.onChange = formik.handleChange;
          input.onBlur = formik.handleBlur;
          input.label = showLabels
            ? input.name.charAt(0).toUpperCase() + input.name.slice(1)
            : null;
          return getInput(input, [
            FORM_INPUT_TYPES.PASSWORD,
            FORM_INPUT_TYPES.TEXT,
          ]);
        })}
      </div>

      <div className="form-icon-buttons-cont">
        {inputs.map((input) => {
        
          return getInput(input, [
            FORM_INPUT_TYPES.ICON_BUTON
          ]);
        })}
      </div>

      <div className="form-links-cont">
        {inputs.map((input) => {
          return getInput(input, [
            FORM_INPUT_TYPES.LINK
          ]);
        })}
      </div>

      <Button onClick={formik.handleSubmit}>Submit!</Button>
    </div>
  );
}
