import React, {useState} from "react";
import { shade } from "tint-shade-color";
import { PRIMARY, SECONDARY } from "../../../styles/colors";
import TabBarChooserItem from "../../atoms/TabBarChooserItem";
import "./styles.css";

const TabBarSelector = ({ position= 0 }) => {
  
  return <div
    style={{ backgroundColor: SECONDARY, left: `${position}px` }}
    className="tab-bar-chooser-selector"
  ></div>;
};

export default function TabBarChooser({
  tabs = ["Templates", "Reports"],
  onTabClick = (index, name) =>
    console.error("No on tab selector handler passed  - TabBarChooser ", index, name),
  style = {},
  className = "",
}) {
  const [slectorPos, setSelectorPos] = useState(0);
  const handleTabClick = (index, name) => {
    onTabClick(index,name);
    return index*200;
  };
  return (
    <div
      style={{ backgroundColor: shade(PRIMARY, 0.1), ...style }}
      className={`tab-bar-chooser-cont ${className}`}
    >
      <TabBarSelector position={slectorPos}  />
      {tabs.map((tab) => {
        let index = tabs.indexOf(tab);
        return (
          <TabBarChooserItem style={{position: 'relative', zIndex: 10}} key={index} index={index} onClick={()=>setSelectorPos(handleTabClick(index, tab))}>
            {tab}
          </TabBarChooserItem>
        );
      })}
    </div>
  );
}
