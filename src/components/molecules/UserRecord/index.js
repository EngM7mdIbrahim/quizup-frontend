import React from "react";
import AppLabel, { TYPES as LABEL_TYPES} from "../../atoms/AppLabel";
import IconBackground from "../IconBackground";
import './styles.css'

export default function UserRecord({ big=false,  tag = "No user name passed here - UserRecord", iconName="user.png", style = {}, className = "" }) {
  return <div style={{ ...style }} className={`user-record-cont ${className}`}>
      <IconBackground big={big} iconName={iconName} />
      <AppLabel type={big ? LABEL_TYPES.SUB_TITLE : LABEL_TYPES.PAR}>{tag}</AppLabel>
  </div>;
}
