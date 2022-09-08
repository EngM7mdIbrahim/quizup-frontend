import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import generalReducer from "./slices/general.slice";
import quizzesReducer from './slices/quizzes.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quizzes: quizzesReducer,
    general: generalReducer,
  },
});
