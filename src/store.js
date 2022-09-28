import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import generalReducer from "./slices/general.slice";
import quizzesReducer from './slices/quizzes.slice';
import classesReducer from './slices/classes.slice';
import teacherClassReducer from './slices/teahcerClass.slice'
import studentClassReducer from './slices/studentClass.slice'

export const store = configureStore({
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  reducer: {
    auth: authReducer,
    quizzes: quizzesReducer,
    general: generalReducer,
    classes: classesReducer,
    teacherClass: teacherClassReducer,
    studentClass: studentClassReducer,
  },
});
