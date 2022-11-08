import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default (resetCallback = null) => {
  const dispatch = useDispatch();

  return (path) => {
    if(resetCallback){
      dispatch(resetCallback());
    }
    navigator(path);
  };
};
