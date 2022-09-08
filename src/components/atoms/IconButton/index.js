import React from "react";
import "./styles.css";

import { PRIMARY } from "../../../styles/colors";
import Image, { TYPES } from '../../atoms/Image'

export default function IconButton({
  style = {},
  className = "",
  backgroundColor = PRIMARY,
  iconName = undefined,
  imageType=TYPES.EXTRA_SMALL,
  onClick = () =>
    console.error("No on click handler passed here - IconButton "),
}) {
  return (
    <div onClick={onClick}
      style={{ backgroundColor, ...style }}
      className={`icon-button-cont ${className}`}
    >
      <Image imageName={iconName} type={imageType} />
    </div>
  );
}
