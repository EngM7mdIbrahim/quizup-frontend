import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN_KEY } from "../utils/constants";

const initialState = {
  isLoading: false,
  errorMessage: "",
  isSocket: false,
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
    setSocket: (state, { payload }) =>{
      state.isSocket = payload
    }
  },
  dummyAction: (_, __) => {},
});

// Action creators are generated for each case reducer function
export const { setLoading, setErrorMessage, checkTimeout, resetState, setSocket } =
  generalSlice.actions;

export default generalSlice.reducer;
