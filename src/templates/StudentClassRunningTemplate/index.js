import React from "react";
import * as yup from "yup";
import AppLabel from "../../components/atoms/AppLabel";
import Image, { TYPES } from "../../components/atoms/Image";
import Form from "../../components/molecules/Form";
import { FORM_INPUT_TYPES } from "../../components/molecules/Form/constants";
import { ACCENT, PRIMARY } from "../../styles/colors";
import "./styles.css";

export default function StudentClassRunningTemplate({
  style = {},
  className = "",
  title = "Question 1",
  headerTitle = "Choices:",
  choices = ['A','B','C', 'D'],
  
}) {
 
  return (
    <div
      style={{ backgroundColor: ACCENT, ...style }}
      className={`page student-running-class-cont ${className}`}
    >
       <Image
          type={TYPES.UNDEFINED}
          style={{
            width: undefined,
            height: "70px",
            objectFit: "contain",
          }}
          imageName="logo-white.png"
        />

        {title && <AppLabel style={{textAlign: 'center'}}>{title}</AppLabel>}
      <div 
        style={{ backgroundColor: PRIMARY }}
        className="student-running-class-details-cont"
      >

      </div>
    </div>
  );
}
