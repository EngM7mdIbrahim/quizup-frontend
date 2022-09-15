import React from "react";
import "./styles.css";

import { PRIMARY } from "../../../styles/colors";
import Image, { TYPES } from "../../atoms/Image";

export default function IconButton({
  hidden = false,
  stopPropagation = false,
  style = {},
  className = "",
  backgroundColor = PRIMARY,
  iconName = undefined,
  imageType = TYPES.EXTRA_SMALL,
  onClick = () =>
    console.error("No on click handler passed here - IconButton "),
}) {
  return (
    <div
      onClick={(e) => {
        onClick();
        stopPropagation && e.stopPropagation();
      }}
      style={{ backgroundColor, ...style }}
      className={`icon-button-cont ${className}`}
    >
      {!hidden && <Image imageName={iconName} type={imageType} />}
    </div>
  );
}
