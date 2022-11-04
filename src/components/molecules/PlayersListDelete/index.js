import React from "react";
import "./styles.css";


import PlayerListDeleteItem from "../PlayerListDeleteItem";
import WaitingFor from "../WaitingFor";

export default function PlayersDeleteList({
  style = {},
  className = "",
  players = [],
  isLoading = false,
  onDeletePlayer = (id) =>
    console.error(
      "No onDeletePlayer handler has been has been passed! - PlayersDeleteList. ID: ",
      id
    ),
}) {
  
  return Array.isArray(players) && players.length !== 0 ? (
    <div
      style={{ ...style }}
      className={`players-list-delete-cont ${className}`}
    >
      {players.map((player, index)=><PlayerListDeleteItem isLoading={isLoading} key={index} name={player.name} onDeletePlayer={()=>onDeletePlayer(index)}/>)}
    </div>
  ) : <WaitingFor text="Waiting For Players ..." />;
}
