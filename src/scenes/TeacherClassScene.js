import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import {
  BASE_URL,
  TEACHER_ON_ACK,
  TEACHER_ACTIONS,
  TEACHER_ON_ERR,
} from "../utils/constants";
import { useDispatch } from "react-redux";
import {
  setRoomDetails,
  resetState,
  setErrorMessage,
  setRoomPin,
} from "../slices/teahcerClass.slice";
import useTeacherClass from "../hooks/useTeacherClass";
import useResetNaviagtor from "../hooks/useResetNavigator";
import { resetSocketLoadingAction } from "../slices/general.slice";

export default function TeacherClassesScene() {
  const { accessToken } = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(null);
  const { quizzes } = useSelector((state) => state.quizzes);
  const { socketLoadingActions } = useSelector(state=>state.general)
  const dispatch = useDispatch();
  const [getUnkownComponent, emitAction, getRenderedComponent] =
    useTeacherClass(socket, socketLoadingActions);
  const { quizID } = useParams();
  const customNavigator = useResetNaviagtor(resetState);

  useEffect(() => {
    if (!accessToken) {
      customNavigator("/signin");
      return;
    }
    const socket = io(`${BASE_URL}`);
    socket.on("connect", () => {
      console.log("Socket is connected! ID: ", socket.id);
    });
    //Add listeners
    socket.on(TEACHER_ON_ACK, (room) => {
      console.log("Received update from the server!", room);
      dispatch(setRoomDetails(room));
      dispatch(resetSocketLoadingAction())
    });
    socket.on(TEACHER_ON_ERR, (errorMessage) => {
      console.log("Error Message from the sockets: ", errorMessage);
      dispatch(setErrorMessage(errorMessage));
      dispatch(resetSocketLoadingAction())
    });

    setSocket(socket);

    return () => {
      socket.off("connect");
      socket.off(TEACHER_ON_ACK);
      socket.off(TEACHER_ON_ERR);
      socket.disconnect();
      setSocket(null);
      dispatch(resetState());
    };
  }, []);

  useEffect(() => {
    if (socket) {
      emitAction(
        TEACHER_ACTIONS.REQ_ROOM,
        "Unable to request room, please check your internet connection!",
        { accessToken, quizID }
      );
    }
  }, [socket]);

  const currentQuizIndex = quizzes.findIndex((quiz) => quiz._id === quizID);
  if (currentQuizIndex === -1) {
    customNavigator("/profile/quizzes");
    return getUnkownComponent(
      "Please restart the quiz again as your refresh has lost the class activity!"
    );
  }

  return <>{getRenderedComponent(quizID)}</>;
}
