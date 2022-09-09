import React from "react";
import format from "date-format";
import AppLabel from "../../components/atoms/AppLabel";
import UserRecord from "../../components/molecules/UserRecord";
import Button from "../../components/atoms/Button";
import "./styles.css";
import { PRIMARY } from "../../styles/colors";
import PlayerReportCard from '../../components/molecules/PlayerReportCard'
import { nanoid } from "@reduxjs/toolkit";

export const getEmptyComponent = (message)=>{
  return <div style={{backgroundColor: PRIMARY}} className="empty-card-component">
    <AppLabel>{message}</AppLabel>
  </div>
}

export default function SingleClassTemplate({
  classTitle = "No name passed here - SingleClassTemplate",
  userName = "No user name passed here - SingleClassTemplate",
  hostedOn = "01/01/2020",
  players = [],
  style = {},
  className = "",
  onBackToReports = () => {
    console.error(
      "No on back to reports hanlder passed here - SingleClassTemplate"
    );
  },
}) {
  
  return (
    <div
      style={{ ...style }}
      className={`profile-template-page report-temp-cont ${className}`}
    >
      <AppLabel isBold>{classTitle}</AppLabel>
      <div style={{ backgroundColor: PRIMARY }} className="report-card-cont">
        <Button onClick={onBackToReports}>Back to All Reports</Button>
        <UserRecord
          iconName="calendar.png"
          tag={`Hosted on: ${format.asString(
            "dd/mm/yyyy",
            new Date(hostedOn)
          )}`}
        />
        <UserRecord tag={`Hosted By: ${userName}`} />
      </div>
      <div style={{backgroundColor: PRIMARY, flexDirection: 'column'}}className="single-report-card-cont">        
        {players.map(player=><PlayerReportCard key={nanoid()} score={player.score} userName={player.name}/>)}
      </div>
    </div>
  );
}
