import React from "react";
import "./styles.css";

import Image, { TYPES } from "../../atoms/Image";
import { ACCENT } from "../../../styles/colors";
import TabBarChooser from "../../molecules/TabChooser";
import Button from "../../atoms/Button";

export default function TopBar({
  name = "No Name is passed here! - TopBar",
  style = {},
  onTabClick = (index, name) =>
    console.error("No on tab selector handler passed  - TopBar ", index, name),
  onButtonClick = () => console.error("No button handler - TopBar!"),
  className = "",
}) {
  return (
    <div
      style={{ backgroundColor: ACCENT, ...style }}
      className={`toolbar-cont ${className}`}
    >
      <Image
        imageName="logo-white.png"
        type={TYPES.MED}
        style={{ height: undefined }}
      />
      <div className="tab-chooser-cont">
        <TabBarChooser onTabClick={onTabClick} tabs={['quizzes', 'reports']} />
      </div>
      <Button onClick={onButtonClick} isPrimary={false}>
        Log Out
      </Button>
    </div>
  );
}
