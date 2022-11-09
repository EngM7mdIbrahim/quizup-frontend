import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { BASE_URL, STUDENT_ON_ERR, STUDENT_ON_ACK } from "../utils/constants";
import { useDispatch } from "react-redux";
import useStudentClass from "../hooks/useStudentClass";
import { setErrorMessage, setLoading } from "../slices/general.slice";

import { setState } from "../slices/studentClass.slice";
import { useSelector } from "react-redux";

export default function StudentClassScene() {
  const { pin } = useParams();
  const [socket, setSocket] = useState(null);
  const { socketID } = useSelector((state) => state.studentClass);
  const { isLoading } = useSelector((state) => state.general);
  const state = useSelector((state) => state.studentClass);
  const [getUnkownComponent, emitAction, getRenderedComponent, execCMD] =
    useStudentClass(socket, pin, state, isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(`${BASE_URL}`);
    setSocket(socket);
    socket.on("connect", () => {
      console.log("Socket is connected! ID: ", socket.id);
      if (!socketID) {
        // socket.emit(STUDENT_ACTIONS.REQUEST_UPDATE, socketID)
      }
    });

    //Add listeners
    socket.on(STUDENT_ON_ACK, (data) => {
      console.log("Received update from the server!", data);
      dispatch(setLoading(false))
      dispatch(setState(data));
    });
    socket.on(STUDENT_ON_ERR, (errorMessage, cmd) => {
      console.log("Error Message from the sockets: ", errorMessage);
      dispatch(setErrorMessage(errorMessage.message));
      dispatch(setLoading(false))
      execCMD(cmd);
    });
    setSocket(socket);
    return () => {
      socket.off("connect");
      socket.off(STUDENT_ON_ACK);
      socket.off(STUDENT_ON_ERR);
      //Remove Listeners
      socket.disconnect();
      setSocket(null);
    };
  }, []);

  return getRenderedComponent();
}
