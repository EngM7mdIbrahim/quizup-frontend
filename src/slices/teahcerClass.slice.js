import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/constants";

const initialState = {
  roomURL: "",
  players: [],
  questionNumber: 0,
  waitingAnswers: false,
  status: STATUS.WAITING_FOR_PLAYERS,
  errorMessage: "",
  isLoading: false,
};

export const teahcerClassSlice = createSlice({
  name: "teahcerClass",
  initialState,
  reducers: {
    resetState: (_) => {
      return initialState;
    },
    setRoomDetails: (state, { payload }) => {
      
      return {
        ...payload,
        isLoading: state.isLoading,
        errorMessage: state.errorMessage
      };
    },
    setErrorMessage: (state, payload) =>{
      state.errorMessage = payload;
    },
    setLoading: (state, {payload = "We are sorry, an error occurred. Please try again!"}) =>{
      state.isLoading = true;
    },
    resetError: (state, _) =>{
      state.errorMessage = "";
    },
  },
});

export const { setRoomDetails, resetState, setErrorMessage, resetError, setLoading } = teahcerClassSlice.actions;
export default teahcerClassSlice.reducer;
