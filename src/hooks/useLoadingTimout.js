import { useDispatch } from "react-redux";

export default (
  loadingAction,
  loadingTracker,
  onErrorAction,
  timeout = 5000
) => {
  const dispatch = useDispatch();
  const setLoading = (errorMessage) => {
    dispatch(loadingAction());
    setTimeout(() => {
        if(loadingTracker){
            dispatch(onErrorAction(errorMessage));
        }
    }, timeout);
  };

  return setLoading();
};
