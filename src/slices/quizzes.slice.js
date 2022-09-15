import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import {
  checkAxiosError,
  isLoadingAction,
  isRejectedAction,
} from "../utils/helper";
import {
  getQuizzesReq,
  deleteQuizReq,
  createTemplateReq,
} from "../api/quizzes.api";
import format from "date-format";

const initialState = {
  isLoading: false,
  errorMessage: "",
  quizzes: undefined,
  template: {
    questions: [{
      question: "What is your question",
      image: null,
      choices: [
        "Write Choice 1",
        "Write Choice 2",
        "Write Choice 3",
        "Write Choice 4",
      ],
      correctAnswer: 0,
    },{type: 'add'}],
    showModal: false,
    selected: 0,
  },
};

export const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    resetState: (state) => {
      state.errorMessage = "";
      state.isLoading = false;
      state.template = {
        questions: [{
          question: "What is your question",
          image: null,
          choices: [
            "Write Choice 1",
            "Write Choice 2",
            "Write Choice 3",
            "Write Choice 4",
          ],
          correctAnswer: 0,
        },{type: 'add'}],
        showModal: false,
        selected: 0,
      };
    },
    setTemplate: (state, { payload }) => {
      state.template = payload;
    },
    deleteQuestion: (state, {payload})=>{
      state.template.questions.splice(payload,1);
    },
    changeQuestionTitle: (state, {payload})=>{
      state.template.questions[payload.id].question = payload.newTitle
    }
  },
  extraReducers: (builder) => {
    return builder
      .addCase(getQuizzes.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.quizzes = payload;
      })
      .addCase(createTemplate.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.quizzes = payload;
      })
      .addMatcher(isLoadingAction("quizzes"), (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addMatcher(isRejectedAction("quizzes"), (state, { payload }) => {
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
      console.error(error);
      return rejectWithValue(checkAxiosError(error));
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  "quizzes/deleteQuiz",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      await deleteQuizReq(id);
      dispatch(getQuizzes());
      return true;
    } catch (error) {
      console.error(error);
      return rejectWithValue(checkAxiosError(error));
    }
  }
);

export const createTemplate = createAsyncThunk(
  "quizzes/createTemplate",
  async (payload, { rejectWithValue }) => {
    try {
      let images = payload.questions.map((question) => question.image);
      console.log("Request: ", payload);
      let payloadJSON = {
        ...payload,
        questions: payload.questions.map((question) => {
          let newQuestion = question;
          delete newQuestion["image"];
          return newQuestion;
        }),
      };
      //Removing the Add Question objects
      payloadJSON.questions.pop();
      images.pop();

      let questionIDs = await createTemplateReq(payloadJSON);
      console.log("Response: ", questionIDs);
      return;

      // let quizzes = await createTemplate(payload);
      // let newQuizzes = quizzes.map((quiz) => {
      //   let newQuiz = {
      //     ...quiz,
      //     lastEdit: format.asString("dd/mm/yyyy", new Date(quiz.lastEdit)),
      //   };
      //   return newQuiz;
      // });
      // return newQuizzes;
    } catch (error) {
      console.error(error);
      return rejectWithValue(checkAxiosError(error));
    }
  }
);

export const { resetState,setTemplate, deleteQuestion,changeQuestionTitle } = quizzesSlice.actions;

export default quizzesSlice.reducer;
