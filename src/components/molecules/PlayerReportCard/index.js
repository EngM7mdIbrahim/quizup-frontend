import React from "react";
import UserRecord from "../UserRecord";
import "./styles.css";

export default function PlayerReportCard({
  score = "No score was passed here - PlayerReportCard",
  userName = "No user name was passed here - PlayerReportCard",
  style = {},
  className = "",
}) {
  return (
    <div
      style={{ ...style }}
      className={`player-report-card-cont ${className}`}
    >
      <UserRecord tag={userName} />
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
