import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TeacherClassStartTemplate from "../templates/TeacherClassStartTemplate";
import io from "socket.io-client";
import { BASE_URL, ON_ACK_SEND_PIN, SEND_PIN } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setRoomDetails } from "../slices/teahcerClass.slice";
import useTeacherClass from "../hooks/useTeacherClass";

const socket = io(`${BASE_URL}`);

export default function ClassesScene() {
  const { accessToken } = useSelector((state) => state.auth);
  const state = useSelector((state) => state.teacherClass);
  const { quizzes } = useSelector((state) => state.quizzes);
  const dispatch = useDispatch();
  const [getUnkownComponent,emitAction,getRenderedComponent] = useTeacherClass();
  const goTo = useNavigate();
  const { quizID } = useParams();

  // const currentQuizIndex = quizzes.findIndex((quiz) => quiz._id === quizID);
  // if (currentQuizIndex ===-1) {
  //   return getUnkownComponent();
  // }
  

  // useEffect(()=>{
  //   if(!accessToken){
  //     goTo('/signin')
  //   }
  // },[goTo]);

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('Socket is connected! ID: ', socket.id)
  //     socket.emit(SEND_PIN, {quizID, accessToken})
  //   });

  //   //Add listeners
  //   socket.on(ON_ACK_SEND_PIN, (data)=>{
  //       dispatch(setRoomDetails(data));
  //   })

  //   return () => {
  //     socket.off('connect');
  //     socket.off(ON_ACK_SEND_PIN);
  //     //Remove Listeners

  //   };
  // }, []);

  

  return <>{getRenderedComponent(quizID)}</>;
}
