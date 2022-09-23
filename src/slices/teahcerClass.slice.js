import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/constants";


const initialState = {
  roomURL: 'KLDJLKAJSDKLSAJDKLASJKDLJASKLDJASKDJLKSAJDKLSAJDKSAJDLKSAJDKLJDKLJSAKDJ',
  pin: undefined,
  players: [],
  questionNumber: 1,
  waitingAnswers: false,
  status: STATUS.QUESTIONS_TRUE_FALSE,
};

export const teahcerClassSlice = createSlice({
  name: "teahcerClass",
  initialState,
  reducers: {
    resetState: (state) => {
      state = initialState
    },
    setRoomDetails: (state, {payload})=>{
      state = payload
    }
    
  }
});

export const { setRoomDetails, resetState } = teahcerClassSlice.actions;
export default teahcerClassSlice.reducer;
