import React from "react";
import "./styles.css";
import Image, { TYPES } from "../../atoms/Image";
import { ACCENT } from "../../../styles/colors";

export default function IconBackground({
  hidden = false,
  big = false,
  iconName = undefined,
  style = {},
  className = "",
}) {
  return (
    <div
      style={{ backgroundColor: ACCENT, ...style }}
      className={`img-background-cont ${className}`}
    >
      {!hidden && (
        <Image
          imageName={iconName}
          type={big ? TYPES.EXTRA_SMALL : TYPES.ALMOSTTINY}
        />
      )}
    </div>
  );
}
