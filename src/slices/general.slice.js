import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN_KEY } from "../utils/constants";

const initialState = {
  isLoading: false,
  errorMessage: "",
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
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setErrorMessage } = generalSlice.actions;

export default generalSlice.reducer;
