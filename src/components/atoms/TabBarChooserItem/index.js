import React from "react";
import { TEXT_COLOR } from "../../../styles/colors";
import "./styles.css";

export default function TabBarChooserItem({
  index = 0,
  children = "No name passed here! -TabBarChooserItem",
  onClick = (index, name)=>console.error('No click handler passed here! - TabBarChooserItem'),
  style = {},
  className = "",
}) {
  return (
    <div onClick={()=>onClick(index,children)} style={{ color: TEXT_COLOR, ...style }} className={`tab-bar-chooser-item-cont ${className}`}>
      <p>{children}</p>
    </div>
  );
}
