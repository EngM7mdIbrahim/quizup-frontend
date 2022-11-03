import React from "react";
import "./styles.css";
import Image, { TYPES } from "../../atoms/Image";
import { PRIMARY } from "../../../styles/colors";

export default function WhiteBackgroundCard({ style = {}, className = "", children }) {
  return (
    <div
      style={{ backgroundColor: PRIMARY, ...style }}
      className={`white-background-card-cont ${className}`}
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
      {children}
    </div>
  );
}
