import { useDispatch } from "react-redux";
import { checkTimeout, checkSocketTimeout, setLoading, addSocketLoadingAction } from "../slices/general.slice";
import { deleteID } from "../slices/studentClass.slice";
import { SERVER_CMDS } from "../utils/constants";

let loadingTimeout = setTimeout(() => {}, 0);

export const getLoadingTimout = () => loadingTimeout;
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
      clearTimeout(loadingTimeout);
    });
  };

  const emitAction = (
    action,
    onTimeoutErrorMessage,
    payload,
    onOkPressButton
  ) => {
    timeOutHandler(onTimeoutErrorMessage, onOkPressButton);
    setTimeout(() => {
      console.log("Entered timeout!");
      dispatch(checkSocketTimeout({errorMessage: onTimeoutErrorMessage, action}));
    }, timeout);
    console.log("Emitting Action:", action, "with payload:", payload, "...");
    dispatch(addSocketLoadingAction(action))
    if (socket) {
      socket.emit(action, payload);
    }else{
      console.log('Tried but the socket is null!')
    }
  };

  const dispatcher = (
    dispatchAction,
    onTimeoutErrorMessage,
    onOkPressButton
  ) => {
    
    timeOutHandler(onTimeoutErrorMessage, onOkPressButton);
    setTimeout(() => {
      console.log("Entered timeout!");
      dispatch(checkTimeout(onTimeoutErrorMessage));
    }, timeout);
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
