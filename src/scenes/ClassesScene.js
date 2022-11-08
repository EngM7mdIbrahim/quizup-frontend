import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGeneralListener from "../hooks/useGeneralListener";
import ClassesTemplate from "../templates/ClassesTemplate";
import { getClasses } from "../slices/classes.slice";
import useResetNaviagtor from "../hooks/useResetNavigator";
import useLoadingState from "../hooks/useLoadingState";
import { useNavigate } from "react-router-dom";

export default function ClassesScene() {
  const { accessToken } = useSelector((state) => state.auth);
  const { classes } = useSelector(
    (state) => state.classes
  );
  const { errorMessage, isLoading } = useSelector((state) => state.general )
  useGeneralListener(errorMessage, isLoading);
  const [internetDispatcher] = useLoadingState();
  const goTo = useNavigate();

  /* eslint-disable */
  useEffect(() => {
    if (!accessToken) {
      goTo("/signin");
    }
    internetDispatcher(getClasses(), "Unable to get your reports, please check your internet connection!");
  }, []);
  /* eslint-disable */

  const handleReportClick = (id) => {
    goTo(`/profile/reports/${id}`);
  };

  return (
    <>
      <ClassesTemplate classes={classes} onReportClick={handleReportClick} />
    </>
  );
}
