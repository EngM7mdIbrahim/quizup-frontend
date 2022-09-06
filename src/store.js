import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import generalReducer from "./slices/general.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    general: generalReducer,
  },
});
