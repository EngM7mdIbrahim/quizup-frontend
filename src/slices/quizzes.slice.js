import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { constructChoicesArray } from "../utils/helper";
import {
  checkAxiosError,
  isLoadingAction,
  isRejectedAction,
} from "../utils/helper";
import {
  getQuizzesReq,
  deleteQuizReq,
  createTemplateReq,
  sendQuizImagesReq,
} from "../api/quizzes.api";
import format from "date-format";

const QUESTION_SCHEME = {
  question: "What is your question",
  image: null,
  choices: [
    "Write Choice 1",
    "Write Choice 2",
    "Write Choice 3",
    "Write Choice 4",
  ],
  correctAnswer: 0,
};

const initialState = {
  isLoading: false,
  errorMessage: "",
  quizzes: undefined,
  addedQuiz: true,
  template: {
    name: "Untitled Quiz",
    questions: [
      {
        question: "What is your question",
        image: null,
        choices: [
          "Write Choice 1",
          "Write Choice 2",
          "Write Choice 3",
          "Write Choice 4",
        ],
        correctAnswer: 0,
      },
      { type: "add" },
    ],
    showModal: false,
    selected: 0,
    tag: "No tags",
  },
};

export const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    resetState: (state) => {
      state.errorMessage = "";
      state.isLoading = false;
      state.addedQuiz = false;
      state.template = {
        questions: [
          {
            question: "What is your question",
            image: null,
            choices: [
              "Write Choice 1",
              "Write Choice 2",
              "Write Choice 3",
              "Write Choice 4",
            ],
            correctAnswer: 0,
          },
          { type: "add" },
        ],
        showModal: false,
        selected: 0,
        name: "Untitled Quiz",
        tag: "No tags",
      };
    },
    setTemplate: (state, { payload }) => {
      state.template = payload;
    },
    deleteQuestion: (state, { payload }) => {
      if (state.template.questions.length - 1 !== payload)
        state.template.questions.splice(payload, 1);
    },
    changeQuestionTitle: (state, { payload }) => {
      state.template.questions[payload.id].question = payload.newTitle;
    },
    changeQuestionImage: (state, { payload }) => {
      state.template.questions[payload.id].image = payload.image;
    },
    changeQuestionCorrectAns: (state, { payload }) => {
      state.template.questions[payload.id].correctAnswer = payload.letter;
    },
    changeQuestionOrder: (state, { payload }) => {
      if (state.template.questions.length <= 2) {
        return;
      }
      let change = payload.isUp
        ? payload.index !== 0
          ? -1
          : 0
        : payload.index !== state.template.questions.length - 1
        ? 1
        : 0;
      const newSelected = payload.index + change;
      const [question] = state.template.questions.splice(payload.index, 1);
      state.template.questions.splice(newSelected, 0, question);
      state.template.selected = newSelected;
    },
    addNewQuestion: (state, { payload }) => {
      const [add_question] = state.template.questions.splice(
        state.template.questions.length - 1,
        1
      );
      let newQuestion = {
        ...QUESTION_SCHEME,
        choices: constructChoicesArray(payload),
      };
      state.template.showModal = false;
      state.template.questions.push(newQuestion);
      state.template.questions.push(add_question);
    },
    clearQuestionImage: (state, { payload }) => {
      state.template.questions[payload].image = null;
    },
    changeQuestionOptionText: (state, { payload }) => {
      state.template.questions[payload.id].choices[payload.optionId] =
        payload.newValue;
    },
    changeTemplateTitle: (state, { payload }) => {
      state.template.name = payload;
    },
    changeTemplateTag: (state, { payload }) => {
      state.template.tag = payload;
    },
  },
  extraReducers: (builder) => {
    return builder
      .addCase(getQuizzes.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.quizzes = payload;
      })
      .addCase(createTemplate.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.addedQuiz = payload;
      })
      .addMatcher(isLoadingAction("quizzes"), (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addMatcher(isRejectedAction("quizzes"), (state, { payload }) => {
        state.errorMessage = payload;
        state.isLoading = false;
      });
  },
});

export const getQuizzes = createAsyncThunk(
  "quizzes/getQuizzes",
  async (payload, { rejectWithValue }) => {
    try {
      let quizzes = await getQuizzesReq(payload);
      let newQuizzes = quizzes.map((quiz) => {
        let newQuiz = {
          ...quiz,
          lastEdit: format.asString("dd/mm/yyyy", new Date(quiz.lastEdit)),
        };
        return newQuiz;
      });
      return newQuizzes;
    } catch (error) {
      console.error(error);
      return rejectWithValue(checkAxiosError(error));
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  "quizzes/deleteQuiz",
  async (id, { rejectWithValue, dispatch }) => {
    try {

      await deleteQuizReq(id);
      dispatch(getQuizzes());
      return true;
    } catch (error) {
      console.error(error);
      return rejectWithValue(checkAxiosError(error));
    }
  }
);

export const createTemplate = createAsyncThunk(
  "quizzes/createTemplate",
  async (payload, { rejectWithValue }) => {
    try {
      let imagesURLS = payload.questions.map((question) => question.image);
      let payloadJSON = {
        ...payload,
        name: payload.name,
        tag: payload.tag,
        questions: payload.questions.map((question) => {
          let newQuestion = { ...question };
          if (newQuestion.image) {
            delete newQuestion["image"];
          }
          return newQuestion;
        }),
      };
      if (payloadJSON.showModal) delete payloadJSON["showModal"];
      if (payloadJSON.selected) delete payloadJSON["selected"];

      //Removing the Add Question objects
      payloadJSON.questions.pop();
      imagesURLS.pop();

      let [questionIDs,id] = await createTemplateReq(payloadJSON);
      let questionIDsCounter = 0;
      let images = await Promise.all(
        imagesURLS.map(async (imageArr) => {
          if (imageArr) {
            let imageBlob = await fetch(imageArr[0]).then((r) => r.blob());
            return new File(
              [imageBlob],
              questionIDs[questionIDsCounter++] + "." + imageArr[1]
            );
          }
          questionIDsCounter++;
          return null;
        })
      );

      images = images.filter((image) => image);

      await sendQuizImagesReq(images, id);
      return true;
    } catch (error) {
      console.error(error);
      return rejectWithValue(checkAxiosError(error));
    }
  }
);

export const {
  resetState,
  setTemplate,
  deleteQuestion,
  changeQuestionTitle,
  changeQuestionImage,
  changeQuestionCorrectAns,
  clearQuestionImage,
  changeQuestionOptionText,
  changeQuestionOrder,
  addNewQuestion,
  changeTemplateTitle,
  changeTemplateTag,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
