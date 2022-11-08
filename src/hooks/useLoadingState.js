import { useDispatch } from "react-redux";
import {
  checkTimeout,
  setErrorMessage,
  setLoading,
} from "../slices/general.slice";

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
      dispatch(setErrorMessage(""));
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

  return [dispatcher, emitAction];
};
