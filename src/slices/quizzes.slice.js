import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { isLoadingAction, isRejectedAction } from "../utils/helper";
import { getQuizzesReq } from "../api/quizzes.api";
import format from "date-format";

const initialState = {
  isLoading: false,
  errorMessage: "",
  quizzes: undefined,
};

export const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    resetState: (state) => {
      state.errorMessage = "";
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(getQuizzes.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.quizzes = payload;
      })
      .addMatcher(isLoadingAction, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addMatcher(isRejectedAction, (state, { payload }) => {
        state.errorMessage = payload;
        state.isLoading = false;
      });
  },
});

export const getQuizzes = createAsyncThunk(
  "quizzes/getQuizzes",
  async (payload, { rejectWithValue }) => {
    try {
      let quizzes = await getQuizzesReq(payload);
      let newQuizzes = quizzes.map((quiz) => {
        let newQuiz = {
          ...quiz,
          lastEdit: format.asString("dd/mm/yyyy", new Date(quiz.lastEdit)),
        };
        console.log("New Quiz: ", newQuiz);
        return newQuiz;
      });
      console.log("Quizzes: ", newQuizzes);
      return newQuizzes;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { resetState } = quizSlice.actions;

export default quizSlice.reducer;
