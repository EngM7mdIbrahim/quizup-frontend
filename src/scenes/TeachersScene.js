import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import RunningClassTemplate from "../templates/RunningClassTemplate";
import io from 'socket.io-client';
import { SEND_PIN } from "../utils/constants";

const socket = io('http://localhost:8000');


export default function ClassesScene() {
  const { accessToken } = useSelector((state) => state.auth);
  const goTo = useNavigate();
  const {quizID} = useParams;

  useEffect(()=>{
    if(!accessToken){
      goTo('/signin')
    }
  },[goTo]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket is connected! ID: ', socket.id)
      socket.emit(SEND_PIN, quizID)
    });

    //Add listeners

    return () => {
      socket.off('connect');
      //Remove Listeners


    };
  }, []);


 

  return (
    <>
      <RunningClassTemplate />
    </>
  );
}
