import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import AppLabel, { TYPES } from "../../components/atoms/AppLabel";
import Button from "../../components/atoms/Button";
import Image, { TYPES as IMAGE_TYPES} from "../../components/atoms/Image";
import PlayerReportCard from "../../components/molecules/PlayerReportCard";
import TeacherClassQuestionHeader from "../../components/organisms/TeacherClassQuestionHeader";
import { ACCENT, PRIMARY } from "../../styles/colors";
import "./styles.css";

export default function TeacherClassReportsScreen({
  style = {},
  className = "",
  scores = [{name: 'Arnav Puri', score: 0.4}],
  onSavePress = () => {
    console.error(
      "No onSavePress handler passed here - TeacherClassReportsScreen"
    );
  },
}) {
  let rank = 1;
  const players = scores.sort((a,b)=>{
    return b.score - a.score;  
  }).map((player, index)=>{
    const newPlayer = {...player, rank}
    if(scores[index+1] && player.score !== scores[index+1].score){
      rank++;
    }
    return newPlayer;
  })
  return (
    <div
      style={{ backgroundColor: ACCENT, ...style }}
      className={`page running-class-reports ${className}`}
    >
      <TeacherClassQuestionHeader
        title='Congratulations all!'
        onButtonPress={onSavePress}
        buttonText='Save Report!'
      />
      <div
        style={{ backgroundColor: PRIMARY }}
        className="running-class-reports-details-cont"
      >
        <AppLabel style={{textAlign: 'center'}} isBold type={TYPES.TITLE}>Dashboard!</AppLabel>
        {players.map(player=><PlayerReportCard longName key={nanoid()} rank={player.rank} score={player.score} userName={player.name}/>)}
      </div>
    </div>
  );
}
