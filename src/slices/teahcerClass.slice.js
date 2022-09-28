import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/constants";

const initialState = {
  roomURL:
    "KLDJLKAJSDKLSAJDKLASJKDLJASKLDJASKDJLKSAJDKLSAJDKSAJDLKSAJDKLJDKLJSAKDJ",
  pin: undefined,
  players: [
    {
      choices: [0],
      name: "Arnav Puri",
    },
    {
      choices: [0],
      name: "Zhen Paital",
    },
    {
      choices: [1],
      name: "Ibrahim Moawad",
    },
  ],
  questionNumber: 1,
  waitingAnswers: true,
  status: STATUS.END_SESSION,
};

export const teahcerClassSlice = createSlice({
  name: "teahcerClass",
  initialState,
  reducers: {
    resetState: (state) => {
      state = initialState;
    },
    setRoomDetails: (state, { payload }) => {
      state = payload;
    },
  },
});

export const { setRoomDetails, resetState } = teahcerClassSlice.actions;
export default teahcerClassSlice.reducer;
