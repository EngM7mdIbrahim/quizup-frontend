import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetState } from "../slices/general.slice";

export default () =>{
    const dispatch = useDispatch();
    const goTo = useNavigate();
    const navigateTo = (path) =>{
        dispatch(resetState());
        goTo(path)
    }
    return navigateTo;
}