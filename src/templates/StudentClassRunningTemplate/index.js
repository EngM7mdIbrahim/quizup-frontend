import React from "react";
import AppLabel, {
  TYPES as LABEL_TYPES,
} from "../../components/atoms/AppLabel";
import Image, { TYPES } from "../../components/atoms/Image";
import StudentOptions from "../../components/organisms/StudentOptions";
import { PRIMARY, ACCENT, WHITE } from "../../styles/colors";
import "./styles.css";

export default function StudentClassRunningTemplate({
  style = {},
  className = "",
  title = undefined,
  subTitle = undefined,
  body = undefined,
  bottomLabel = "You are the best!",
  bottomSubLabel = undefined,
  onChoiceClick = (choice) =>
    console.error(
      "No onChoiceClick handler has been passed! - StudentClassRunningTemplate. Choice:",
      body[choice]
    ),
}) {
  const isBodyArray = Array.isArray(body);
  const titleStyle = isBodyArray
    ? {}
    : { marginTop: "20px", textAlign: "center" };
  return (
    <div
      style={{ backgroundColor: ACCENT, ...style }}
      className={`page student-running-class-cont border ${className}`}
    >
      <Image
        type={TYPES.UNDEFINED}
        style={{
          width: undefined,
          height: "70px",
          objectFit: "contain",
        }}
        imageName="logo-white.png"
      />

      {title && (
       title.split('\n').map(word=> <AppLabel key={word} isBold style={{ textAlign: "center", color: WHITE }}>
       {word}
     </AppLabel>)
      )}

      <div
        style={{ backgroundColor: PRIMARY }}
        className="student-running-class-details-cont"
      >
        {subTitle && (
          <AppLabel
            type={LABEL_TYPES.SUB_TITLE}
            isBold
            style={{ textAlign: "left", ...titleStyle }}
          >
            {subTitle}
          </AppLabel>
        )}

        {isBodyArray ? (
          <StudentOptions onChoiceClick={onChoiceClick} choices={body} />
        ) : typeof body === "string" &&
          body.split(".")[1] &&
          body.split(".")[1].length === 3 ? (
          <div className="student-running-class-img-cont">
            <Image imageName={body} type={TYPES.MED} />
          </div>
        ) : React.isValidElement(body) ? (
          <div className="student-running-class-img-cont">{body}</div>
        ) : (
          <AppLabel isBold type={LABEL_TYPES.SUB_TITLE}>
            Not a valid body passed here - StudentClassRunningTemplate!
          </AppLabel>
        )}

        {bottomSubLabel && (
          <AppLabel
            isBold
            type={LABEL_TYPES.PAR}
            style={{ textAlign: "center" }}
          >
            {bottomSubLabel}
          </AppLabel>
        )}
      </div>

      <AppLabel
        isBold
        style={{ textAlign: "center", color: WHITE }}
        type={LABEL_TYPES.PAR}
      >
        {bottomLabel}
      </AppLabel>
    </div>
  );
}
