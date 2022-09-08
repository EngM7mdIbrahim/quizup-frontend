import React from "react";
import { ACCENT } from "../../../styles/colors";
import AppLabel, { TYPES as LABEL_TYPES} from "../../atoms/AppLabel";
import Image, { TYPES } from "../../atoms/Image";
import './styles.css'

export default function UserRecord({ big=false, userName = "No user name passed here - UserRecord", style = {}, className = "" }) {
  return <div style={{ ...style }} className={`user-record-cont ${className}`}>
      <div style={{backgroundColor: ACCENT}} className="user-record-img-cont">
        <Image imageName="user.png" type={big ? TYPES.SMALL: TYPES.ALMOSTTINY}/>
      </div>
      <AppLabel type={big ? LABEL_TYPES.SUB_TITLE : LABEL_TYPES.PAR}>{userName}</AppLabel>
  </div>;
}
