import React, { useState } from "react";
import "./styles.css";

import SideTabBarItem from "../../molecules/SideTabBarItem";
import { nanoid } from "@reduxjs/toolkit";

const TAB_ITEM_EXAMPLE = {
  name: nanoid(),
  displayName: "No name passed here!",
  imageName: undefined,
};

const TAB_ITEMS = [
  {
    name: "dashboard",
    displayName: "Dashboard",
    imageName: "dashboard.png",
  },
  {
    name: "ad",
    displayName: "Show Ads",
    imageName: "ad.png",
  },
  {
    name: "create",
    displayName: "Create Ad",
    imageName: "create.png",
  },
];

export default function SideBarTabItems({
  style = {},
  className = "",
  tabs = TAB_ITEMS,
  onItemSelect = (name) =>
    console.error(
      "No item seletion handler was passed! - SideBarTabItems",
      name
    ),
}) {
  const [selected, setSelected] = useState(tabs[0].name);
  return (
    <div style={{ ...style }} className={` ${className}`}>
      {tabs.map((tab) => (
        <SideTabBarItem
          onClick={(name) => {
            setSelected(name);
            onItemSelect(name);
          }}
          selected={tab.name === selected}
          name={tab.name}
          key={tab.name || nanoid()}
          imageName={tab.imageName || TAB_ITEM_EXAMPLE.imageName}
        >
          {tab.displayName || TAB_ITEM_EXAMPLE.displayName}
        </SideTabBarItem>
      ))}
    </div>
  );
}
