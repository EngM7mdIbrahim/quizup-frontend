import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setErrorMessage, setLoading, dummyAction} from "../slices/general.slice";

export default (errorMessage, isLoading, resetError = null)=>{
    const dispatch = useDispatch();

    useEffect(() => {
        if (errorMessage || errorMessage !== "") {
          dispatch(setErrorMessage(errorMessage));
        }
        dispatch(setLoading(isLoading));
        if(resetError){
          dispatch(resetError());
        }
      }, [isLoading, errorMessage, dispatch]);
}