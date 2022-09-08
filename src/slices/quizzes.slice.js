import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { checkAxiosError, isLoadingAction, isRejectedAction } from "../utils/helper";
import { getQuizzesReq, deleteQuizReq } from "../api/quizzes.api";
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
      .addMatcher(isLoadingAction('quizzes'), (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addMatcher(isRejectedAction('quizzes'), (state, { payload }) => {
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
        return newQuiz;
      });
      return newQuizzes;
    } catch (error) {
      console.error(error)
      return rejectWithValue(checkAxiosError(error));
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  "quizzes/deleteQuiz",
  async ({id}, { rejectWithValue, dispatch }) => {
    try {
      await deleteQuizReq(id);
      dispatch(getQuizzes())
      return true;
    } catch (error) {
      console.error(error)
      return rejectWithValue(checkAxiosError(error));
    }
  }
);

export const { resetState } = quizSlice.actions;

export default quizSlice.reducer;
