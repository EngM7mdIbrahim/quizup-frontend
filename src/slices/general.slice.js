import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN_KEY } from "../utils/constants";

const initialState = {
  isLoading: false,
  errorMessage: "",
  // alertMessage: "",
  // onAlertOk: ()=>{}
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
    // showConfirmation: (state, {payload})=>{
    //   state.alertMessage = payload.message;
    //   state.onAlertOk = payload.onAlertOk
    // },
    // resetConfirmation: (state)=>{
    //   state.alertMessage = "";
    //   state.onAlertOk = ()=>{};
    // },
  },
  dummyAction: (_,__) =>{}
});

// Action creators are generated for each case reducer function
export const { setLoading, setErrorMessage, showConfirmation, resetConfirmation, dummyAction, resetError  } = generalSlice.actions;

export default generalSlice.reducer;
