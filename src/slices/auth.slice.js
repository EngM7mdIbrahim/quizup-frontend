import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInReq, signUpReq } from "../api/auth.api";
import {
  ACCESS_TOKEN_KEY,
  USER_NAME,
} from "../utils/constants";
import { handleThunkError, isFulfilledAuthAction } from "../utils/helper";
import { setLoading } from "./general.slice";

const initialState = {
  accessToken:
    localStorage.getItem(ACCESS_TOKEN_KEY) === "null"
      ? null
      : localStorage.getItem(ACCESS_TOKEN_KEY),
  name:
    localStorage.getItem(USER_NAME) === "null"
      ? "Unknown Name!"
      : localStorage.getItem(USER_NAME),
  // refreshToken: localStorage.getItem(ACCESS_TOKEN_KEY),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.accessToken = null;
      // state.refreshToken = null;
      localStorage.setItem(ACCESS_TOKEN_KEY, null);
      // localStorage.setItem(REFRESH_TOKEN_KEY, null);
    },
  },
  extraReducers: (builder) => {
    return builder.addMatcher(isFulfilledAuthAction, (state, { payload }) => {
      console.log('Payload: ', payload)
      state.isLoading = false;
      state.accessToken = payload.accessToken;
      state.name = payload.name;
      localStorage.setItem(ACCESS_TOKEN_KEY, state.accessToken);
      localStorage.setItem(USER_NAME, state.name);
      // state.refreshToken = payload.refreshToken;
      // localStorage.setItem(REFRESH_TOKEN_KEY, state.refreshToken);
    });
  },
});

export const signIn = createAsyncThunk(
  "auth/signin",
  async (payload, { dispatch }) => {
    try {
      let response = await signInReq(payload);
      dispatch(setLoading(false));
      return response.data;
    } catch (error) {
      handleThunkError(error, dispatch);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signup",
  async (payload, {dispatch }) => {
    try {
      let response = await signUpReq(payload);
      dispatch(setLoading(false));
      return response.data;
    } catch (error) {
      handleThunkError(error, dispatch);
    }
  }
);

export const { signOut, resetState, resetError } = authSlice.actions;
export default authSlice.reducer;
