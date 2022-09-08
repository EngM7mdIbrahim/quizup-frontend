import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInReq, signUpReq } from "../api/auth.api";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../utils/constants";
import {
  checkAxiosError,
  isFulfilledAuthAction,
  isLoadingAction,
  isRejectedAction,
} from "../utils/helper";

const initialState = {
  isLoading: false,
  errorMessage: "",
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY)==='null'? null : localStorage.getItem(ACCESS_TOKEN_KEY),
  name: "Unkown Name!",
  // refreshToken: localStorage.getItem(ACCESS_TOKEN_KEY),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.errorMessage = "";
      state.isLoading=false;
    },
    signOut: (state) => {
      state.accessToken = null;
      // state.refreshToken = null;
      localStorage.setItem(ACCESS_TOKEN_KEY, null);
      // localStorage.setItem(REFRESH_TOKEN_KEY, null);
    },
  },
  extraReducers: (builder) => {
    return builder
      .addMatcher(isFulfilledAuthAction, (state, { payload }) => {
        state.isLoading = false;
        state.accessToken = payload.accessToken;
        state.name = payload.name;
        localStorage.setItem(ACCESS_TOKEN_KEY, state.accessToken);
        // state.refreshToken = payload.refreshToken;
        // localStorage.setItem(REFRESH_TOKEN_KEY, state.refreshToken);
      })
      .addMatcher(isLoadingAction('auth'), (state, action) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addMatcher(isRejectedAction('auth'), (state, { payload }) => {
        state.errorMessage = payload;
        state.isLoading = false;
      });
  },
});

export const signIn = createAsyncThunk(
  "auth/signin",
  async (payload, { rejectWithValue }) => {
    try {
      let response = await signInReq(payload);
      return response.data;
    } catch (error) {
      console.error(error)
      return rejectWithValue(checkAxiosError(error));
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signup",
  async (payload, { rejectWithValue }) => {
    try {
      let response = await signUpReq(payload);
      return response.data;
    } catch (error) {
      console.error(error)
      return rejectWithValue(checkAxiosError(error));
    }
  }
);

export const { signOut, resetState } = authSlice.actions;
export default authSlice.reducer;
