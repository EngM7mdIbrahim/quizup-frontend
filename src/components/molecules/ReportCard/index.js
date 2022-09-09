import React from "react";
import { ACCENT, PRIMARY } from "../../../styles/colors";
import AppLabel, { TYPES as LABEL_TYPES } from "../../atoms/AppLabel";
import Image, { TYPES } from "../../atoms/Image";
import UserRecord from "../UserRecord";
import "./styles.css";

export default function ReportCard({ onClick= ()=>console.error(' No on click handler was passed - ReportCard'), lastEdited = "No last edited dtase passed here - ReportCard", classTitle="No class name passed here - ReportCard", players=0, style = {}, className = "" }) {
  return (
    <div onClick={onClick}  style={{backgroundColor: PRIMARY, ...style }} className={`report-card-cont ${className}`}>
      <div className="report-card-class-name-cont">
        <Image imageName="logo-square.png" type={TYPES.ALMOSTEXTRA_SMALL}/>
        <AppLabel isBold type={LABEL_TYPES.SUB_SUB_TITLE}>{classTitle}</AppLabel>
      </div>
      <AppLabel style={{flex: 1, textAlign: 'center'}} type={LABEL_TYPES.PAR}>Last Edited on: {lastEdited}</AppLabel>
      <UserRecord tag={`${players} players`}/>
    </div>
  );
}
