import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGeneralListener from "../hooks/useGeneralListener";
import ClassesTemplate from "../templates/ClassesTemplate";
import { getClasses, resetState } from "../slices/classes.slice";
import useResetNaviagtor from "../hooks/useResetNaviagtor";

export default function ClassesScene() {
  const { accessToken } = useSelector((state) => state.auth);
  const { classes, errorMessage, isLoading } = useSelector(
    (state) => state.classes
  );
  useGeneralListener(errorMessage, isLoading);
  const dispatch = useDispatch();
  const customNavigator = useResetNaviagtor(resetState);

  /* eslint-disable */
  useEffect(() => {
    if (!accessToken) {
      customNavigator("/signin");
    }
    dispatch(getClasses());
  }, []);
  /* eslint-disable */

  const handleReportClick = (id) => {
    customNavigator(`/profile/reports/${id}`);
  };

  return (
    <>
      <ClassesTemplate classes={classes} onReportClick={handleReportClick} />
    </>
  );
}
