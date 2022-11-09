import React, { useEffect } from "react";
import { useSelector, } from "react-redux";
import ClassesTemplate from "../templates/ClassesTemplate";
import { getClasses } from "../slices/classes.slice";
import useLoadingState from "../hooks/useLoadingState";
import useCustomNavigator from "../hooks/useCustomNavigator";

export default function ClassesScene() {
  const { accessToken } = useSelector((state) => state.auth);
  const { classes } = useSelector(
    (state) => state.classes
  );
  const [internetDispatcher] = useLoadingState();
  const goTo = useCustomNavigator();

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
