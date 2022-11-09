import { useDispatch } from "react-redux";
import {
  checkTimeout,
  setLoading,
} from "../slices/general.slice";
import { deleteID } from "../slices/studentClass.slice";
import { SERVER_CMDS } from "../utils/constants";


const defaultErrorCallback = () => {
  console.log("Nothing was assigned to ");
};

let errorPopUpAction = defaultErrorCallback;
const setErrorPopUpAction = (localCallback) => {
  errorPopUpAction = localCallback;
};
const resetErrorPopUpAction = () => {
  errorPopUpAction = defaultErrorCallback;
};
export const getErrorPopUpAction = () => {
  return errorPopUpAction;
};

export default (timeout = 5000, socket = null) => {
  const dispatch = useDispatch();
  const timeOutHandler = (
    onTimeoutErrorMessage = "We are sorry, an error occurred! Please try again later!",
    onOkPressButton = defaultErrorCallback
  ) => {
    //Setting the default callback when ok is pressed!
    setErrorPopUpAction(() => {
      onOkPressButton();
      resetErrorPopUpAction();
    });
    setTimeout(() => {
      console.log("Entered timeout!");
      dispatch(checkTimeout(onTimeoutErrorMessage));
    }, timeout);
  };

  const emitAction = (
    action,
    onTimeoutErrorMessage,
    payload,
    onOkPressButton
  ) => {
    timeOutHandler(onTimeoutErrorMessage, onOkPressButton);
    console.log("Emitting Action:", action, "with payload:", payload, "...");
    dispatch(setLoading(true));
    if (socket) {
      socket.emit(action, payload);
    }
  };

  const dispatcher = (
    dispatchAction,
    onTimeoutErrorMessage,
    onOkPressButton
  ) => {
    timeOutHandler(onTimeoutErrorMessage, onOkPressButton);
    //Initiate loading state
    dispatch(setLoading(true));
    //Pass the action to the dispatcher
    dispatch(dispatchAction);
  };

  const execCMD = (cmd) => {
    if (!cmd) {
      return;
    }
    switch (cmd) {
      case SERVER_CMDS.deleteID:
        dispatch(deleteID());
        break;
    }
  };

  return [dispatcher, emitAction, execCMD];
};
