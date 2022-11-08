import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AppLabel from "../components/atoms/AppLabel";
import Image, { TYPES } from "../components/atoms/Image";
import { deleteID, resetError } from "../slices/studentClass.slice";
import { STATUS, STUDENT_ACTIONS, SERVER_CMDS } from "../utils/constants";
import StudentClassStartTemplate from "../templates/StudentClassStartTemplate";
import StudentClassRunningTemplate from "../templates/StudentClassRunningTemplate";
import IconBackgroundText from "../components/atoms/IconBackgroundText";
import StudentStats from "../components/organisms/StudentStats";
import { useEffect } from "react";
import StudentClassWaitingForOthers from "../templates/StudentClassWaitingForOthers";
import { setLoading } from "../slices/studentClass.slice";
import ComponentErrorPompt from "../components/organisms/ComponentErrorPompt";
import useLoadingState from "./useLoadingState";

const getErrorComponent = (error) => <ComponentErrorPompt error={error} />;
const getStudentClassStartScreen = (emitAction, initialPin, isLoading) => {
  return (
    <StudentClassStartTemplate
      isLoading={isLoading}
      initialPin={initialPin}
      onPinSubmit={(payload) => {
        emitAction(STUDENT_ACTIONS.JOIN_ROOM, payload);
      }}
    />
  );
};

const getStudentClassRunningScreen = (emitAction, questionNumber, choices) => {
  const handleChoiceClick = (choice) => {
    emitAction(STUDENT_ACTIONS.SUBMIT_ANSWER, choice);
  };
  return (
    <StudentClassRunningTemplate
      body={choices}
      subTitle={choices.length > 2 ? "Choices: " : "True/False"}
      title={`Question ${questionNumber}:`}
      onChoiceClick={handleChoiceClick}
    />
  );
};
const getStudentClassAfterQuestion = (
  isWaiting,
  correctAnswers,
  questionNumber,
  choices
) => {
  return (
    <StudentClassRunningTemplate
      body={
        isWaiting ? (
          choices[questionNumber - 1] !== undefined ? (
            <IconBackgroundText letter={choices[questionNumber - 1]} />
          ) : undefined
        ) : correctAnswers[questionNumber - 1] !== undefined ? (
          correctAnswers[questionNumber - 1] === choices[questionNumber - 1] ? (
            "check.png"
          ) : (
            "cross.png"
          )
        ) : undefined
      }
      subTitle={
        isWaiting
          ? "Waiting for other players ..."
          : correctAnswers[questionNumber - 1] === choices[questionNumber - 1]
          ? "Correct!"
          : "Incorrect!"
      }
      bottomSubLabel="Your choice is on the podium!"
      title={`Question ${questionNumber}:`}
    />
  );
};

const getStudentClassAfterClass = (choices, correctAnswers, rank) => {
  return (
    <StudentClassRunningTemplate
      body={<StudentStats correcAnswers={correctAnswers} choices={choices} />}
      // subTitle={}
      title={`You're ${rank} on the list! \n Here is your status:`}
    />
  );
};

const getStudentClassWaitingForOthers = (username) => {
  return <StudentClassWaitingForOthers username={username} />;
};

export default (socket, pin, state) => {
  if (pin === undefined) {
    pin = "";
  }
  const { status, questionNumber, choices, correctAnswers, rank, name } = state;
  const [_,emitAction] = useLoadingState(null,socket)

  const getUnkownComponent = (message = "Unknown Quiz ID ...") =>
    getErrorComponent(message);

  const getRenderedComponent = () => {
    switch (status) {
      case STATUS.WAITING_FOR_PLAYERS:
        return getStudentClassStartScreen(emitAction, pin, isLoading);
      case STATUS.QUESTIONS_CHOICES:
        return getStudentClassRunningScreen(
          emitAction,
          questionNumber,
          [0, 1, 2, 3]
        );
      case STATUS.QUESTIONS_TRUE_FALSE:
        return getStudentClassRunningScreen(emitAction, questionNumber, [0, 1]);
      case STATUS.WAITING_ANSWERS:
        return getStudentClassAfterQuestion(
          true,
          null,
          questionNumber,
          choices
        );
      case STATUS.SHOW_ANSWERS:
        return getStudentClassAfterQuestion(
          false,
          correctAnswers,
          questionNumber,
          choices
        );
      case STATUS.END_SESSION:
        return getStudentClassAfterClass(choices, correctAnswers, rank);
      case STATUS.WAITING_FOR_OTHERS_JOIN:
        return getStudentClassWaitingForOthers(name);
      default:
        return getUnkownComponent(
          `Recieved unsupported game status. Status: ${status}`
        );
    }
  };

  const execCMD = (cmd) => {
    if (!cmd) {
      return;
    }
    switch (cmd) {
      case SERVER_CMDS.deleteID:
        dispatch(deleteID());
        break;
    }
  };

  return [getUnkownComponent, emitAction, getRenderedComponent, execCMD];
};
