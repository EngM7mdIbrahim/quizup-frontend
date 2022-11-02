import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEYS, STATUS } from "../utils/constants";

const initialState = {
  name: '',
  socketID: window.localStorage.getItem(LOCAL_STORAGE_KEYS.STUDENT_SOCKET_ID),
  correctAnswers: [],
  choices: [],
  rank: -1,
  questionNumber: -1,
  status: STATUS.WAITING_FOR_PLAYERS,
  pin: undefined
};

export const studentClassSlice = createSlice({
  name: "studentClass",
  initialState,
  reducers: {
    resetState: (state) => {
      return initialState;
    },
    setState: (state, { payload }) => {
      if(payload.socketID){
        window.localStorage.setItem(LOCAL_STORAGE_KEYS.STUDENT_SOCKET_ID, payload.socketID);
      }
      return payload;
    },
    setErrorMessage: (state, payload) =>{
      state.errorMessage = payload;
    },
    deleteID: (state, _)=>{
      state.socketID = null;
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.STUDENT_SOCKET_ID, null);
    },
    setRoomPin: (state, {payload}) =>{
      state.pin = payload;
    }
  },
});

export const { setState, resetState, deleteID, setErrorMessage, setRoomPin } = studentClassSlice.actions;
export default studentClassSlice.reducer;
