import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN_KEY } from "../utils/constants";

const initialState = {
  isLoading: false,
  errorMessage: "",
  socketLoadingActions: [],
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    resetState: (_, __) => {
      return initialState;
    },
    checkTimeout: (state, { payload }) => {
      if (state.isLoading) {
        state.isLoading = false;
        state.errorMessage = payload;
      }
    },
    checkSocketTimeout: (state, { payload }) => {
      if (state.socketLoadingActions.findIndex(action => action === payload.action) !== -1) {
        state.socketLoadingActions = [];
        state.errorMessage = payload.errorMessage;
      }
    },
    setSocket: (state, { payload }) => {
      state.isSocket = payload;
    },
    addSocketLoadingAction: (state, { payload }) => {
      state.socketLoadingActions.push(payload);
    },
    resetSocketLoadingAction: (state) => {
      state.socketLoadingActions = []
    },
  },
  dummyAction: (_, __) => {},
});

// Action creators are generated for each case reducer function
export const {
  setLoading,
  setErrorMessage,
  checkTimeout,
  checkSocketTimeout,
  resetState,
  addSocketLoadingAction,
  resetSocketLoadingAction
} = generalSlice.actions;

export default generalSlice.reducer;
