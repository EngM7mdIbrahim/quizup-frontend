import React from "react";
import "./styles.css";

import PlayerListDeleteItem from "../PlayerListDeleteItem";
import WaitingFor from "../WaitingFor";
import { isSocketLoadingAction } from "../../../utils/helper";
import { TEACHER_ACTIONS } from "../../../utils/constants";

export default function PlayersDeleteList({
  style = {},
  className = "",
  players = [],
  socketLoadingActions = [],
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
      {players.map((player, index) => (
        <PlayerListDeleteItem
          isLoading={isSocketLoadingAction(
            socketLoadingActions,
            TEACHER_ACTIONS.DELETE_PLAYER + JSON.stringify({ index })
          )}
          key={index}
          name={player.name}
          onDeletePlayer={() => onDeletePlayer(index)}
        />
      ))}
    </div>
  ) : (
    <WaitingFor text="Waiting For Players ..." />
  );
}
