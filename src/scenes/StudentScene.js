import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import RunningClassTemplate from "../templates/RunningClassTemplate";
import io from 'socket.io-client';
import { BASE_URL, ON_ACK_SEND_PIN, SEND_PIN } from "../utils/constants";
import { useDispatch } from "react-redux";
import {setRoomDetails} from '../slices/teahcerClass.slice'

const socket = io(`${BASE_URL}`);


export default function StudentScene() {
  const {errorMessage, roomURL, pin} = useSelector(state=>state.teacherClass);
  const dispatch = useDispatch();

  const goTo = useNavigate();
  const {quizID} = useParams();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket is connected! ID: ', socket.id)
      socket.emit(SEND_PIN, {quizID, accessToken})
    });

    //Add listeners
    socket.on(ON_ACK_SEND_PIN, (data)=>{
        dispatch(setRoomDetails(data));
    })

    return () => {
      socket.off('connect');
      socket.off(ON_ACK_SEND_PIN);
      //Remove Listeners



    };
  }, []);


 

  return (
    <>
      <RunningClassTemplate roomURL={roomURL} pin={pin} />
    </>
  );
}
