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
  errorMessage: "",
  isLoading: false
};

export const studentClassSlice = createSlice({
  name: "studentClass",
  initialState,
  reducers: {
    resetState: (_) => {
      return initialState;
    },
    setState: (_, { payload }) => {
      if(payload.socketID){
        window.localStorage.setItem(LOCAL_STORAGE_KEYS.STUDENT_SOCKET_ID, payload.socketID);
      }
      return {...payload, errorMessage: "", isLoading: false};
    },
    setErrorMessage: (state, {payload}) => {
      state.errorMessage = payload;
    },
    setLoading: (state, {payload = "We are sorry, an error occurred. Please try again!"}) =>{
      state.isLoading = true;
    },
    resetError: (state, _) =>{
      state.errorMessage = "";
      // state.isLoading = false;
    },
    deleteID: (state, _)=> {
      state.socketID = null;
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.STUDENT_SOCKET_ID, null);
    }
  },
});

export const { setState, resetState, deleteID, setErrorMessage, setRoomPin, resetError, setLoading } = studentClassSlice.actions;
export default studentClassSlice.reducer;
