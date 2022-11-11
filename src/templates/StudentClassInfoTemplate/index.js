import React from "react";
import AppLabel, { TYPES } from "../../components/atoms/AppLabel";
import Button from '../../components/atoms/Button'
import UserRecord from "../../components/molecules/UserRecord";
import WhiteBackgroundCard from "../../components/molecules/WhiteBackgroundCard";
import { ACCENT } from "../../styles/colors";
import "./styles.css";

export default function StudentClassInfoTemplate({
  style = {},
  className = "",
  isDeleted = false,
  username = "No username - StudentClassWaitingForOthers",
  handleRejoin = () =>{
    console.log('No rejoin handler was passed here! - StudentClassInfoTemplate')
  }
}) {
  return (
    <div
      style={{ backgroundColor: ACCENT, ...style }}
      className={`page running-class-cont ${className}`}
    >
      <WhiteBackgroundCard
        style={{ gap: "30px", justifyContent: "flex-start" }}
      >
        <AppLabel isBold type={TYPES.PAR} style={{ textAlign: "center" }}>
          {isDeleted
            ? "Please ask the teacher to join again!"
            : "Your name is on the podium !"}
        </AppLabel>
        <UserRecord
          style={{ flex: 1, justifyContent: "center" }}
          big
          tag={username}
        />
        <AppLabel
          type={TYPES.SUB_SUB_TITLE}
          isBold
          style={{ textAlign: "center" }}
        >
          {isDeleted
            ? "You have been kicked out from this room!"
            : "Waiting for others ..."}
        </AppLabel>
        {isDeleted && <Button onClick={handleRejoin}>Rejoin!</Button>}
      </WhiteBackgroundCard>
    </div>
  );
}
