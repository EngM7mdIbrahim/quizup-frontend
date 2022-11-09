import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ComponentErrorPrompt from "../components/organisms/ComponentErrorPrompt";
import useLoadingState from "./useLoadingState";
import { setSocket } from "../slices/general.slice";

export default (socket) => {
  const [_, emitAction, execCMD] = useLoadingState(undefined, socket);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSocket(true));
    return () => {
      dispatch(setSocket(false));
    };
  }, []);

  const getUnkownComponent = (message = "Unknown Quiz ID ...") =>
    getErrorComponent(message);
  const getErrorComponent = (error) => <ComponentErrorPrompt error={error} />;

  return [emitAction, getUnkownComponent, getErrorComponent, execCMD];
};
