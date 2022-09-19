import React from "react";
import { ACCENT } from "../../../styles/colors";
import IconButton from "../../atoms/IconButton";
import { TYPES } from "../../atoms/Image";
import UserRecord from "../UserRecord";
import "./styles.css";

export default function PlayerListDeleteItem({
  name = "No name passed here - PlayerListDeleteItem",
  style = {},
  className = "",
  onDeletePlayer = (id) =>
  console.error(
    "No onDeletePlayer handler has been has been passed! - PlayerListDeleteItem. ID: ",
    id
  ),
}) {
  return (
    <div
      style={{ ...style }}
      className={`players-list-delete-item-cont ${className}`}
    >
      <UserRecord big tag={name} />
      <IconButton imageType={TYPES.ALMOSTTINY} style={{ width:'30px', height: '30px',borderRadius: '50%'}} backgroundColor={ACCENT} iconName="recycling-bin.png" onClick={onDeletePlayer} />
    </div>
  );
}
