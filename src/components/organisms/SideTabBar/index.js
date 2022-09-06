import React from "react";
import {format} from 'date-fns';
import { SECONDARY } from "../../../styles/colors";
import AppLabel,  { TYPES as LABEL_TYPES} from "../../atoms/AppLabel";
import Image, { TYPES } from "../../atoms/Image";


import "./styles.css";
import SideBarTabItems from "../SideTabBarItems";

export default function SideTabBar({
  style = {},
  className = "",
  imageName = undefined,
  userName = "No user name passed here - SideTabBar",
  joinedSince = new Date()
}) {
  return (
    <div
      style={{ backgroundColor: SECONDARY, ...style }}
      className={`profile-tab-view-cont ${className}`}
    >
      <Image style={{alignSelf: 'center'}} imageName={imageName} type={TYPES.MED} isRounded />
      <AppLabel style={{textAlign: 'center'}} isBold type={LABEL_TYPES.SUB_SUB_TITLE}>{userName}</AppLabel>
      <AppLabel style={{textAlign: 'center'}} type={LABEL_TYPES.PAR}>Joined since: {format(joinedSince,'dd/mm/yyyy')}</AppLabel>
      <SideBarTabItems/>
    </div>
  );
}
