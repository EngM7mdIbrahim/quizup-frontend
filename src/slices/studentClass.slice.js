import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/constants";

const initialState = {
  name: 'Mohamed Ibrahim',
  socketID: null,
  correctAnswers: [],
  choices: [],
  rank: 0,
  questionNumber: 1,
  waitingAnswers: true,
  status: STATUS.QUESTIONS_CHOICES,
};

export const studentClassSlice = createSlice({
  name: "studentClass",
  initialState,
  reducers: {
    resetState: (state) => {
      state = initialState;
    },
    setState: (state, { payload }) => {
      state = payload;
    },
  },
});

export const { setRoomDetails, resetState } = studentClassSlice.actions;
export default studentClassSlice.reducer;
