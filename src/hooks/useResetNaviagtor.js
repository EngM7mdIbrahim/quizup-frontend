import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default (resetCallback) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  return (path) => {
    dispatch(resetCallback());
    navigator(path);
  };
};
