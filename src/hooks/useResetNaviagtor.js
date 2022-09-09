import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default (resetCallback = null) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  return (path) => {
    if(resetCallback){
      dispatch(resetCallback());
    }
    navigator(path);
  };
};
