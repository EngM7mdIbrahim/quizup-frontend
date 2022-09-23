import { useFormik } from "formik";
import React from "react";
import {
  constructValidationSchema,
  getInitialValues,
  getInput,
} from "./helper";
import "./styles.css";
import Button from "../../atoms/Button";
import { EXAMPLE_INPUTS, FORM_INPUT_TYPES } from "./constants";
import { SECONDARY } from "../../../styles/colors";
import AppLabel, { TYPES } from "../../atoms/AppLabel";
import Image, { TYPES as IMAGE_TYPES } from "../../atoms/Image";

export default function Form({
  style = {},
  titleStyle = {},
  className = "",
  subComponent = false,
  submitButtonText = 'Submit!',
  showLabels = false,
  showLogo = false,
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
      style={{ backgroundColor: subComponent ? 'transparent' : SECONDARY, ...style }}
      className={`${subComponent? 'subcomponent-form-temp':'card login-form-temp'} ${className}`}
    >
      {showLogo && <Image
        isContain
        style={{ alignSelf: "center" }}
        imageName={titleImageName}
        type={IMAGE_TYPES.EXTRALARGE}
      />}
      {title!=='' && <AppLabel style={titleStyle} isBold type={TYPES.TITLE}>
        {title}
      </AppLabel>}
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
          return getInput(input, [FORM_INPUT_TYPES.ICON_BUTON]);
        })}
      </div>

      <div className="form-links-cont">
        {inputs.map((input) => {
          return getInput(input, [FORM_INPUT_TYPES.LINK]);
        })}
      </div>

      <Button onClick={formik.handleSubmit}>{submitButtonText}</Button>
    </div>
  );
}
