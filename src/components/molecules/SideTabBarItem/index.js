import React from "react";
import "./styles.css";

import { ACCENT } from "../../../styles/colors";
import Image, { TYPES } from "../../atoms/Image/";
import AppLabel, { TYPES as LABEL_TYPES } from "../../atoms/AppLabel";

export default function SideTabBarItem({
  style = {},
  className = "",
  selected = false,
  imageName = undefined,
  name = "No name passed for this item - SideTabBarItem",
  children = "No Text passed here for this item - SideTabBarItem",
  onClick = (name) =>
    console.error(
      "No side tab bar item click handler passed - SideTabBarItem",
      name
    ),
}) {
  return (
    <div
      onClick={() => {
        onClick(name);
      }}
      style={{ ...style }}
      className={`side-tab-bar-item-cont ${className}`}
    >
      {selected && (
        <div
          style={{ backgroundColor: ACCENT }}
          className="selected-tab-bar-item"
        />
      )}
      <Image
        imageName={imageName}
        style={{ marginLeft: !selected ? "20px" : "10px", alignSelf: "center" }}
        type={TYPES.EXTRA_SMALL}
      />
      <AppLabel
        style={{ alignSelf: "center" }}
        isBold={selected}
        type={LABEL_TYPES.PAR}
      >
        {children}
      </AppLabel>
    </div>
  );
}
