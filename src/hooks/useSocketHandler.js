import ComponentErrorPrompt from "../components/organisms/ComponentErrorPrompt";
import useLoadingState from "./useLoadingState";

export default (socket) => {
  const [_, emitAction, execCMD] = useLoadingState(undefined, socket);

  const getUnkownComponent = (message = "Unknown Quiz ID ...") =>
    getErrorComponent(message);
  const getErrorComponent = (error) => <ComponentErrorPrompt error={error} />;

  return [emitAction, getUnkownComponent, getErrorComponent, execCMD];
};
