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
  },
});

export const { setRoomDetails, resetState, setErrorMessage } = teahcerClassSlice.actions;
export default teahcerClassSlice.reducer;
