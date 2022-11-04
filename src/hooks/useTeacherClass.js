import { useDispatch, useSelector } from "react-redux";
import AppLabel from "../components/atoms/AppLabel";
import Image, { TYPES } from "../components/atoms/Image";
import TeacherClassQuestionTemplate from "../templates/TeacherClassQuestionTemplate";
import TeacherClassReportsTemplate from "../templates/TeacherClassReportsTemplate";
import TeacherClassStartTemplate from "../templates/TeacherClassStartTemplate";
import { SERVER_CMDS, STATUS, TEACHER_ACTIONS } from "../utils/constants";
import { calcChoicesStats, extractPin, getPlayerScore } from "../utils/helper";
import useGeneralListener from "./useGeneralListener";
import { setLoading } from "../slices/teahcerClass.slice";

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

const getTeacherClassStartScreen = (roomURL, pin, players) => (
  <TeacherClassStartTemplate players={players} roomURL={roomURL} pin={pin} />
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
  emitAction
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

const getTeacherClassReportsScreen = (quizID, quizzes, players) => {
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

export default (socket) => {
  const { status, roomURL, players, questionNumber, errorMessage, isLoading } =
    useSelector((state) => state.teacherClass);
  const pin = extractPin(roomURL);
  const { quizzes } = useSelector((state) => state.quizzes);
  useGeneralListener(errorMessage, isLoading);

  const emitAction = (action, payload) => {
    console.log(
      "Action should be emitted: ",
      action,
      "with the following payload: ",
      payload
    );
    //TODO: handle emiting the ranks and the scores for each player.
    //TODO: handle the saving event
    if (socket) {
      socket.emit(action, payload);
    }
    dispatch(setLoading());
  };
  const getUnkownComponent = (message = "Unkown Quiz ID ...") =>
    getErrorComponent(message);
  const getRenderedComponent = (quizID) => {
    switch (status) {
      case STATUS.WAITING_FOR_PLAYERS:
        return getTeacherClassStartScreen(roomURL, pin, players);
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
          emitAction
        );
      case STATUS.END_SESSION:
        return getTeacherClassReportsScreen(quizID, quizzes, players);
      default:
        return getUnkownComponent(
          `Recieved unsupported game status. Status: ${status}`
        );
    }
  };


  return [getUnkownComponent, emitAction, getRenderedComponent];
};
