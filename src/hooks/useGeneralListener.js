import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setErrorMessage, setLoading } from "../slices/general.slice";

export default (errorMessage, isLoading)=>{
    const dispatch = useDispatch();

    useEffect(() => {
        if (errorMessage) {
          dispatch(setErrorMessage(errorMessage));
        }
        dispatch(setLoading(isLoading));
      }, [isLoading, errorMessage, dispatch]);
}