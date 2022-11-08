import { useDispatch } from "react-redux";
import ComponentErrorPompt from "../components/organisms/ComponentErrorPompt";
import useLoadingState from "./useLoadingState";

export default (socket) => {
  const dispatch = useDispatch();
  const [_, emitAction] = useLoadingState(null, socket);

  const getUnkownComponent = (message = "Unknown Quiz ID ...") =>
    getErrorComponent(message);
  const getErrorComponent = (error) => <ComponentErrorPompt error={error} />;
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
  
  return [emitAction, getUnkownComponent, execCMD];
};
