import React from "react";
import QuestionsPreviewBar from "../../components/organisms/QuestionsPreviewBar";
import "./styles.css";

export default function CreateQuizTemplate({
  style = {},
  className = "",
  
}) {
  return (
    <div
      style={{ ...style }}
      className={`profile-template-page ${className}`}
    >
      <QuestionsPreviewBar />
    </div>
  );
}
