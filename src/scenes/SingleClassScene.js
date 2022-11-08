import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SingleClassTemplate, { getEmptyComponent } from "../templates/SingleClassTemplate";
import { useNavigate, useParams } from "react-router-dom";

const checkSettings = (classes, id) => {
  if (!classes) {
    return "Cannot load your reports! Please return back to the reports tab to fetch your reports!";
  }
  if (classes === []) {
    return "You don't have any classes there! Please create one by starting a quiz!";
  }
  if (!classes.find((session) => session._id === id)) {
    return "Cannot find your report regarding this class! Please return back to the reports tab to fetch your correct reports!";
  }
  return null;
};

export default function SignleClassScene() {
  const { accessToken, name } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { classes } = useSelector((state) => state.classes);
  const goTo = useNavigate();

  /* eslint-disable */
  useEffect(() => {
    if (!accessToken) {
      goTo("/signin");
    }
  }, []);
  /* eslint-disable */

  const handleBackToReports = () => {
    goTo("/profile/reports");
  };

  let renderedComp = <></>;
  const message = checkSettings(classes, id);

  if (message) {
    renderedComp = getEmptyComponent(message);
  } else {
    let session = classes.find((session) => session._id === id);
    renderedComp = (
      <SingleClassTemplate
        classTitle={session.name}
        hostedOn={session.createdAt}
        onBackToReports={handleBackToReports}
        players={session.players}
        userName={name}
      />
    );
  }
  return renderedComp;
}
