import React, { useState } from "react";
import { useEffect } from "react";
import { PRIMARY } from "../../../styles/colors";
import AppLabel, { TYPES } from "../../atoms/AppLabel";
import "./styles.css";

export default function Timer({
  style = {},
  duration = 0,
  onTimeEnd = () => {
    console.error(
      "No onTimeEnd handler passed here - Timer"
    );
  },
  className = "",
}) {
  const [currTime, setTime] = useState(duration);
  let timer = {};
  const handleTimeChange = () => {
    if (currTime > 0) {
      setTime(currTime =>currTime - 1);
    } else {
      clearInterval(timer);
      onTimeEnd();
    }
  };
  useEffect(() => {
    timer = setInterval(()=>handleTimeChange(timer), 1000);
    return () =>{
      clearInterval(timer)
    }
  });
  return (
    <div
      style={{ backgroundColor: PRIMARY, ...style }}
      className={`timer-cont ${className}`}
    >
      <AppLabel isBold type={TYPES.SUB_TITLE}>
        {currTime}s
      </AppLabel>
    </div>
  );
}
