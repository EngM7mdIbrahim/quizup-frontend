import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import {
  handleThunkError,
} from "../utils/helper";
import { getClassesReq } from "../api/classes.api";
import { setLoading } from "./general.slice";

const initialState = {
  classes: undefined,
};

export const classesSlice = createSlice({
  name: "classes",
  initialState,
  extraReducers: (builder) => {
    return builder.addCase(getClasses.fulfilled, (state, { payload }) => {
      state.classes = payload;
    });
  },
});

export const getClasses = createAsyncThunk(
  "quizzes/getClasses",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      let classes = await getClassesReq();
      dispatch(setLoading(false));
      return classes;
    } catch (error) {
      handleThunkError(error, dispatch, rejectWithValue);
    }
  }
);

export const {} = classesSlice.actions;

export default classesSlice.reducer;
