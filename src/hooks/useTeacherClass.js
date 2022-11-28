import { useSelector } from "react-redux";
import TeacherClassQuestionTemplate from "../templates/TeacherClassQuestionTemplate";
import TeacherClassReportsTemplate from "../templates/TeacherClassReportsTemplate";
import TeacherClassStartTemplate from "../templates/TeacherClassStartTemplate";
import { STATUS, TEACHER_ACTIONS } from "../utils/constants";
import { calcChoicesStats, extractPin, getPlayerScore } from "../utils/helper";
import useSocketHandler from "./useSocketHandler";

const getTeacherClassStartScreen = (
  roomURL,
  pin,
  players,
  accessToken,
  emitAction,
  socketLoadingActions
) => (
  <TeacherClassStartTemplate
    onDeletePlayer={(index) => {
      emitAction(
        TEACHER_ACTIONS.DELETE_PLAYER,
        "Unable to delete the player, please check your internet connection!",
        { accessToken, index }
      );
    }}
    socketLoadingActions={socketLoadingActions}
    players={players}
    roomURL={roomURL}
    pin={pin}
  />
);

const validateTeacherClassQuestion = (quizID, quizzes, questionNumber) => {
  if (!quizID) {
    return `Recieved null quiz ID: ${quizID}.`;
  }
  if (!quizzes) {
    return `Recieved null quizzes: ${quizzes}.`;
  }
  const quiz = quizzes.find((quiz) => quiz._id === quizID);
  if (!quiz) {
    return `The quiz with this ID: ${quizID} has no questions.`;
  }
  const questions = quiz.questions;
  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    return `There is no quiz with this ID: ${quizID}.`;
  }
  if (!questionNumber) {
    return [questions];
  }
  const question = questions[questionNumber - 1];
  if (!question) {
    return `There is no question with this index: ${questionNumber} in this quiz.`;
  }
  const choices = question.choices;
  if (!choices || !Array.isArray(choices) || choices.length < 2) {
    return `There question with this index ${questionNumber} has invalid choices: ${choices}`;
  }
  return [question];
};

const getTeacherClassQuestionsScreen = (
  quizID,
  quizzes,
  questionNumber,
  players,
  waitingAnswers,
  emitAction,
  getErrorComponent
) => {
  const payload = validateTeacherClassQuestion(quizID, quizzes, questionNumber);
  if (!Array.isArray(payload)) {
    return getErrorComponent(payload);
  }
  const [question] = payload;
  return (
    <TeacherClassQuestionTemplate
      onTimeEnd={() => {
        emitAction(TEACHER_ACTIONS.REQ_ROOM);
      }}
      imageName={question.image}
      question={question.question}
      questionNumber={questionNumber}
      waitingAnswers={waitingAnswers}
      duration={30}
      choices={question.choices}
      correctAnswer={question.correctAnswer}
      choiceStats={calcChoicesStats(question.choices, players)}
    />
  );
};

const getTeacherClassReportsScreen = (
  quizID,
  quizzes,
  players,
  getErrorComponent
) => {
  const payload = validateTeacherClassQuestion(quizID, quizzes);
  if (!Array.isArray(payload)) {
    return getErrorComponent(payload);
  }
  const [questions] = payload;
  const correctAnswers = questions.map((question) => question.correctAnswer);
  const scores = players.map((player) => ({
    name: player.name,
    score: getPlayerScore(player.choices, correctAnswers),
  }));
  return <TeacherClassReportsTemplate scores={scores} />;
};

export default (socket, socketLoadingActions) => {
  const { status, roomURL, players, questionNumber } = useSelector(
    (state) => state.teacherClass
  );
  const { accessToken } = useSelector((state) => state.auth);
  const [emitAction, getUnkownComponent, getErrorComponent, execCMD] =
    useSocketHandler(socket);
  const { quizzes } = useSelector((state) => state.quizzes);

  const pin = extractPin(roomURL);
  const getRenderedComponent = (quizID) => {
    switch (status) {
      case STATUS.WAITING_FOR_PLAYERS:
        return getTeacherClassStartScreen(
          roomURL,
          pin,
          players,
          accessToken,
          emitAction,
          socketLoadingActions
        );
      case STATUS.QUESTIONS_CHOICES:
      case STATUS.QUESTIONS_TRUE_FALSE:
        return getTeacherClassQuestionsScreen(
          quizID,
          quizzes,
          questionNumber,
          players,
          true,
          emitAction
        );
      case STATUS.SHOW_ANSWERS:
        return getTeacherClassQuestionsScreen(
          quizID,
          quizzes,
          questionNumber,
          players,
          false,
          emitAction,
          getErrorComponent
        );
      case STATUS.END_SESSION:
        return getTeacherClassReportsScreen(
          quizID,
          quizzes,
          players,
          getErrorComponent
        );
      default:
        return getUnkownComponent(
          `Recieved unsupported game status. Status: ${status}`
        );
    }
  };

  return [getUnkownComponent, emitAction, getRenderedComponent];
};
