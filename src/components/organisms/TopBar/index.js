import React from "react";
import './styles.css'

import Image, {TYPES} from '../../atoms/Image'
import { ACCENT } from "../../../styles/colors";

export default function TopBar({ style = {}, className = "" }) {
  return <div style={{ backgroundColor: ACCENT, ...style }} className={`toolbar-cont ${className}`}>
    <Image imageName="logo-white.png" type={TYPES.MED} style={{height: undefined}}/>
    
  </div>;
}
