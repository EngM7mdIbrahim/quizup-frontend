import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { checkAxiosError, isLoadingAction, isRejectedAction } from "../utils/helper";
import { getClassesReq } from "../api/classes.api";

const sliceName = "classes";
const initialState = {
  isLoading: false,
  errorMessage: "",
  classes: undefined,
};



export const classesSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetState: (state) => {
      state.errorMessage = "";
      state.isLoading = false;
    },
    resetError: (state, _) =>{
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(getClasses.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.classes = payload;
      })
      .addMatcher(isLoadingAction(sliceName), (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addMatcher(isRejectedAction(sliceName), (state, { payload }) => {
        state.errorMessage = payload;
        state.isLoading = false;
      });
  },
});

export const getClasses = createAsyncThunk(
  "quizzes/getClasses",
  async (_, { rejectWithValue }) => {
    try {
      let classes = await getClassesReq();
      return classes;
    } catch (error) {
      console.error(error)
      return rejectWithValue(checkAxiosError(error));
    }
  }
);


export const { resetState, resetError } = classesSlice.actions;

export default classesSlice.reducer;
