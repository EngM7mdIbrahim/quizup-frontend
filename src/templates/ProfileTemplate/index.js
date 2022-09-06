import React from "react";
import { useParams } from "react-router-dom";
import FragmentHandler from "../../components/organisms/FragmentHandler";
import TopBar from '../../components/organisms/TopBar';
import { PRIMARY } from "../../styles/colors";

import "./styles.css";

export default function ProfileTemplate({
  name = "Mohamed Ibrahim",
  photoUrL = "user-avatar.jpg",
  component = undefined
}) {
  
  const tabs = [
    {
      name: "templates",
      displayName: "Show Ads",
      imageName: "ad.png",
    },
    {
      name: "create",
      displayName: "Create Ad",
      imageName: "create.png",
    },
  ];
  return (
    <div className="page">
      <TopBar tabs={tabs} userName={name} imageName={photoUrL} />
      {/* <FragmentHandler
        fragments={tabs.map((tab) => {
          return { component: tab.component, name: tab.name };
        })}
        selected={component}
      /> */}
    </div>
  );
}
