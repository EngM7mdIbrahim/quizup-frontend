import React from "react";
import "./styles.css";

import { PRIMARY } from "../../../styles/colors";
import Image, { TYPES } from "../../atoms/Image";
import LoadingIndicator from "../LoadingIndicator";

export default function IconButton({
  hidden = false,
  stopPropagation = false,
  style = {},
  className = "",
  isLoading = false,
  loadingIcon = "logo-square-white.png",
  backgroundColor = PRIMARY,
  iconName = undefined,
  imageType = TYPES.EXTRA_SMALL,
  onClick = () =>
    console.error("No on click handler passed here - IconButton "),
}) {
  return (
    <div
      onClick={(e) => {
        if (!isLoading) {
          onClick();
        }
        stopPropagation && e.stopPropagation();
      }}
      style={{ backgroundColor, ...style }}
      className={`icon-button-cont ${className}`}
    >
      {isLoading ? (
        <LoadingIndicator
          iconName={loadingIcon}
          style={{ alignSelf: "center", width: "20px", height: "20px" }}
        />
      ) : (
        !hidden && <Image imageName={iconName} type={imageType} />
      )}
    </div>
  );
}
