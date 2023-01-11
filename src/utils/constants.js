export const ACCESS_TOKEN_KEY = "access_token";
export const USER_NAME = "user-name";
export const REFRESH_TOKEN_KEY = "refresh_token";

export const BASE_URL = process.env.REACT_APP_API_URL || "https://quiz-up-backend.onrender.com";

export const STATUS = {
  WAITING_FOR_PLAYERS: "waiting-players",
  WAITING_FOR_OTHERS_JOIN: "waiting-others-join",
  QUESTIONS_CHOICES: "choices",
  QUESTIONS_TRUE_FALSE: "true-false",
  SHOW_ANSWERS: "show-ans",
  END_SESSION: "end-session",
  WAITING_ANSWERS: "waiting-answers",
  DELETED_PLAYER: "player-deleted"
};

export const SERVER_CMDS = {
  deleteID: "DELETE_ID",
};

export const LOCAL_STORAGE_KEYS = {
  STUDENT_SOCKET_ID: "SSID",
};

//TEACHER SOCKET ACTIONS
export const TEACHER_ACTIONS = {
  REQ_ROOM: "teacher-join",
  REQUEST_UPDATE: "teacher-request-update-state",
  DELETE_PLAYER: 'teacher-delete-player',
};

export const TEACHER_ON_ACK = "teacher-ack";
export const TEACHER_ON_ERR = "teacher-err";

//STUDENT SOCKET ACTIONS
export const REQUEST_UPDATE = "student-request-update-state";
export const STUDENT_ACTIONS = {
  JOIN_ROOM: "student-join",
  REQUEST_UPDATE: "student-request-update-state",
  SUBMIT_ANSWER: "student-submit-ans",
};

export const STUDENT_ON_ACK = "student-ack";
export const STUDENT_ON_ERR = "student-err";
