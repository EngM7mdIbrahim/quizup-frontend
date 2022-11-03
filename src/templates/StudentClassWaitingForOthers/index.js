import React from "react";
import AppLabel, { TYPES } from "../../components/atoms/AppLabel";
import UserRecord from "../../components/molecules/UserRecord";
import WhiteBackgroundCard from "../../components/molecules/WhiteBackgroundCard";
import { ACCENT } from "../../styles/colors";
import "./styles.css";

export default function StudentClassWaitingForOthers({
  style = {},
  className = "",
  username = "No username - StudentClassWaitingForOthers",
}) {
  return (
    <div
      style={{ backgroundColor: ACCENT, ...style }}
      className={`page running-class-cont ${className}`}
    >
      <WhiteBackgroundCard
        style={{ gap: "30px", justifyContent: "flex-start" }}
      >
        <AppLabel
        isBold
          type={TYPES.PAR}
          style={{ textAlign: "center" }}
        >
          Your name is on the podium !
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
          Waiting for others ...
        </AppLabel>
      </WhiteBackgroundCard>
    </div>
  );
}
