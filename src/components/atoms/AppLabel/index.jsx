import React from "react";
import { BLACK, isDark, WHITE } from "../../../styles/colors";
import "./styles.css";

export const TYPES = {
  TITLE: 1,
  SUB_TITLE: 2,
  SUB_SUB_TITLE: 3,
  PAR: 4,
  TINY: 5,
};

export default function AppLabel({
  className = "",
  children = "No Text here! - ALM",
  type = TYPES.TITLE,
  isBold = false,
  style = {},
}) {
  let result = {};
  let color = isDark ? WHITE : BLACK;
  switch (type) {
    case TYPES.TITLE:
      result = (
        <h1
          style={{ color, ...style }}
          className={isBold ? `bold-text ${className}` : className}
        >
          {children}
        </h1>
      );
      break;
    case TYPES.SUB_TITLE:
      result = (
        <h2
          style={{ color, ...style }}
          className={isBold ? `bold-text ${className}` : className}
        >
          {children}
        </h2>
      );
      break;
    case TYPES.SUB_SUB_TITLE:
      result = (
        <h3
          style={{ color, ...style }}
          className={isBold ? `bold-text ${className}` : className}
        >
          {children}
        </h3>
      );
      break;
    case TYPES.TINY:
      result = (
        <p
          style={{ fontSize: '12px', color, ...style }}
          className={isBold ? `bold-text ${className}` : className}
        >
          {children}
        </p>
      );
      break;
    default:
      result = (
        <p
          style={{ color, ...style }}
          className={isBold ? `bold-text ${className}` : className}
        >
          {children}
        </p>
      );
      break;
  }

  return result;
}
