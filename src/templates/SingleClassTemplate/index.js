import React from "react";
import AppLabel from "../../components/atoms/AppLabel";
import UserRecord from '../../components/molecules/UserRecord'
import "./styles.css";

export default function SingleClassTemplate({
  classTitle = "No name passed here - SingleClassTemplate",
  userName = "No user name passed here - SingleClassTemplate",
  style = {},
  className = "",
}) {
  console.log('Entered!')
  return (
    <div
      style={{ ...style }}
      className={`profile-template-page report-temp-cont ${className}`}
    >
      <AppLabel isBold>{classTitle}</AppLabel>
      <div className="report-details-cont">
        <Button>Back to All Reports</Button>
        
        <UserRecord />
        <UserRecord userName={`Hosted By: ${userName}`}/>
      </div>
    </div>
  );
}
