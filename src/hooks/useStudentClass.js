import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AppLabel from "../components/atoms/AppLabel";
import Image, { TYPES } from "../components/atoms/Image";
import { ACCENT, WHITE } from "../styles/colors";
import { STATUS, STUDENT_ACTIONS, TEACHER_ACTIONS } from "../utils/constants";
import StudentClassStartTemplate from "../templates/StudentClassStartTemplate";
import StudentClassRunningTemplate from "../templates/StudentClassRunningTemplate";
const getErrorComponent = (error) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "50px",
      flexDirection: "column",
    }}
    className="page"
  >
    <Image type={TYPES.MED} imageName="logo-square.png" />
    <AppLabel style={{ textAlign: "center" }}>{error}</AppLabel>
  </div>
);
const getStudentClassStartScreen = (emitAction) => (
  <StudentClassStartTemplate
    onPinSubmit={(payload) => {
      emitAction(STUDENT_ACTIONS.JOIN_ROOM, payload);
    }}
  />
);

const getStudentClassRunningScreen = (emitAction) => (
  <StudentClassRunningTemplate />
)

export default (socket, pin) => {
  const { status } = useSelector((state) => state.studentClass);
  const dispatch = useDispatch();

  const emitAction = (action, payload) => {
    console.log(
      "Action should be emitted: ",
      action,
      "with the following payload: ",
      payload
    );
    // socket.emit(action, payload);
  };

  useEffect(() => {
    if (!pin) {
      emitAction(STUDENT_ACTIONS.REQUEST_UPDATE);
    }
  }, []);

  const getUnkownComponent = (message = "Unkown Quiz ID ...") =>
    getErrorComponent(message);
  const getRenderedComponent = () => {
    switch (status) {
      case STATUS.WAITING_FOR_PLAYERS:
        return getStudentClassStartScreen(emitAction);
      case STATUS.QUESTIONS_CHOICES:
      case STATUS.QUESTIONS_TRUE_FALSE:
        return getStudentClassRunningScreen(emitAction);
      case STATUS.SHOW_ANSWERS:
        return <></>;
      case STATUS.END_SESSION:
        return <></>;
      default:
        return getUnkownComponent(
          `Recieved unsupported game status. Status: ${status}`
        );
    }
  };

  return [getUnkownComponent, emitAction, getRenderedComponent];
};
