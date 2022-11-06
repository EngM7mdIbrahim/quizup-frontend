import { useDispatch } from "react-redux";
import {
  checkTimeout,
  setErrorMessage,
  setLoading,
} from "../slices/general.slice";

const defaultErrorCallback = () =>{
  console.log('Nothing was assigned to ');
}

let errorPopUpAction = defaultErrorCallback;
const setErrorPopUpAction = (localCallback) =>{
  errorPopUpAction = localCallback;
}
const resetErrorPopUpAction = () =>{
  errorPopUpAction = defaultErrorCallback;
}
export const getErrorPopUpAction = () =>{
  return errorPopUpAction;
}



export default (timeout = 5000) => {
  const dispatch = useDispatch();

  const setLocalErrorMessage = (errorMessage) => {
    dispatch(setErrorMessage(errorMessage));
  };
  const dispatcher = (
    dispatchAction,
    onTimeoutErrorMessage = "We are sorry, an error occurred! Please try again later!",
    onOkPressButton = defaultErrorCallback,
  ) => {
    //Setting the default callback when ok is pressed!
    setErrorPopUpAction(()=>{
      onOkPressButton();
      resetErrorPopUpAction();
      setLocalErrorMessage("");
    });
    //Initiate loading state
    dispatch(setLoading(true));
    //Pass the action to the dispatcher
    dispatch(dispatchAction);
    
    setTimeout(() => {
      console.log('Entered timeout!')
      dispatch(checkTimeout(onTimeoutErrorMessage));
    }, timeout);
  };

  return [dispatcher, setLocalErrorMessage];
};
