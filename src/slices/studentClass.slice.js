import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/constants";

const initialState = {
  name: 'Mohamed Ibrahim',
  socketID: null,
  correctAnswers: [1,0],
  choices: [0,0],
  rank: 0,
  questionNumber: 1,
  status: STATUS.END_SESSION,
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
