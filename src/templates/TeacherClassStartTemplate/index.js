import React from "react";
import Button from "../../components/atoms/Button";
import Image, { TYPES } from "../../components/atoms/Image";
import PlayersDeleteList from "../../components/molecules/PlayersListDelete";
import QRCodeDetails from "../../components/molecules/QRCodeDetails";
import { ACCENT, PRIMARY } from "../../styles/colors";
import "./styles.css";

export default function TeacherClassStartTemplate({
  style = {},
  className = "",
  players = [],
  pin = undefined,
  isLoading = false,
  roomURL = "",
  onDeletePlayer = (id) =>
    console.error(
      "No onDeletePlayer handler has been has been passed! - RunningClassTemplate. ID: ",
      id
    ),
  onStartGame = () =>
    console.error(
      "No onStartGame handler has been has been passed! - RunningClassTemplate."
    ),
}) {
  return (
    <div
      style={{ backgroundColor: ACCENT, ...style }}
      className={`page running-class-cont border ${className}`}
    >
      <div
        style={{ backgroundColor: PRIMARY }}
        className="running-class-details-cont"
      >
        <div className="running-class-inner-details-cont">
          <Image
            type={TYPES.UNDEFINED}
            style={{
              alignSelf: "flex-start",
              width: undefined,
              height: "100px",
              objectFit: "contain",
            }}
            imageName="logo.png"
          />
          <PlayersDeleteList
            isLoading={isLoading}
            style={{ flex: 1 }}
            players={players}
            onDeletePlayer={onDeletePlayer}
          />
          {Array.isArray(players) && players.length !== 0 && (
            <Button onClick={onStartGame} style={{ alignSelf: "center" }}>
              Start the game!
            </Button>
          )}
        </div>
        <div
          className="running-class-inner-details-cont"
          id="running-class-right-details-cont"
        >
          <QRCodeDetails value={roomURL} pin={pin} />
        </div>
      </div>
    </div>
  );
}
