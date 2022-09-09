import React from "react";
import AppLabel from "../../components/atoms/AppLabel";
import ReportCard from "../../components/molecules/ReportCard";
import format from "date-format";
import "./styles.css";

export default function ReportsTemplate({
  classes = [],
  style = {},
  className = "",
  onReportClick = (id)=>console.error(' No on report click handler was passed - ReportsTemplate. ID: ',id )
}) {
  return (
    <div
      style={{ ...style }}
      className={`profile-template-page reports-temp-cont ${className}`}
    >
      <AppLabel isBold>Reports</AppLabel>
      {classes.map((session) => {
        return (
          <ReportCard
            key={session._id}
            onClick={()=>{onReportClick(session._id)}}
            players={session.players.length}
            classTitle={session.name}
            lastEdited={format.asString("dd/mm/yyy", new Date(session.createdAt))}
          />
        );
      })}
    </div>
  );
}
