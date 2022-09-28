export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export const BASE_URL = 'http://localhost:8000'

export const STATUS = {
    WAITING_FOR_PLAYERS: 'waiting-players',
    QUESTIONS_CHOICES: 'choices',
    QUESTIONS_TRUE_FALSE: 'true-false',
    SHOW_ANSWERS: 'show-ans',
    END_SESSION: 'end-session'
}


//TEACHER SOCKET ACTIONS
export const TEACHER_ACTIONS = {
    REQ_ROOM: 'teacher-join',
    REQUEST_UPDATE: 'teacher-request-update-state'
}

export const TEACHER_ON_ACK = 'teacher-ack'

//STUDENT SOCKET ACTIONS
export const REQUEST_UPDATE = 'student-request-update-state'
export const STUDENT_ACTIONS = {
    JOIN_ROOM: 'student-join',
    REQUEST_UPDATE: 'student-request-update-state'
}

export const STUDENT_ON_ACK = 'student-ack'
