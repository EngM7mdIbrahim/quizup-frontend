import React from "react";
import AppLabel, {TYPES} from "../../atoms/AppLabel";
import UserRecord from "../UserRecord";
import "./styles.css";

export default function PlayerReportCard({
  score = "No score was passed here - PlayerReportCard",
  userName = "No user name was passed here - PlayerReportCard",
  style = {},
  rank = undefined,
  longName = false,
  className = "",
}) {
  return (
    <div
      style={{ ...style }}
      className={`player-report-card-cont ${className}`}
    >
      {rank && <AppLabel isBold type={TYPES.SUB_SUB_TITLE}>{rank}</AppLabel>}
      <UserRecord style={longName && {flex: 1}} tag={userName} />
      <UserRecord
        tag={
          !isNaN(score) ? `${parseFloat(score * 100).toFixed(0)}% Complete` : score
        }
        iconName={
          !isNaN(score)
            ? score >= 0.5
              ? "check.png"
              : "cross.png"
            : "cross.png"
        }
      />
    </div>
  );
}
