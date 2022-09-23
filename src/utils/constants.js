export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export const BASE_URL = 'http://localhost:8000'

export const STATUS = {
    WAITING_FOR_PLAYERS: 'waiting-players',
    WAITING_FOR_ANSWERS: 'waiting-ans',
    QUESTIONS_CHOICES: 'choices',
    QUESTIONS_TRUE_FALSE: 'true-false',
    SHOW_ANSWERS: 'show-ans',
    END_SESSION: 'end-session'
}


//TEACHER SOCKET ACTIONS
export const TEACHER_ACTIONS = {
    REQ_ROOM: 'teacher-join'
}

export const ON_ACK = 'teacher-ack'

//STUDENT SOCKET ACTIONS
export const REQUEST_UPDATE = 'student-request-update-state'