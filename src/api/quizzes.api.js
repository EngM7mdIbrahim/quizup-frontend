import apiClient from "./general";
import { ACCESS_TOKEN_KEY, BASE_URL } from "../utils/constants";
import axios from "axios";
export const getQuizzesReq = async () => {
  let response = await apiClient.get("/quizzes");
  return response.data;
};

export const deleteQuizReq = async (id) => {
  await apiClient.delete(`/quizzes/${id}`);
};

export const createTemplateReq = async (template) => {
  let {data} = await apiClient.post("/quizzes/", template);
  const {questions, id} = data
  return [questions,id];
};

export const sendQuizImagesReq = async (images, quizID) => {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append("images", image);
  });
  formData.append('quizID',quizID)
  //Log From Data
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
  }


  await axios.post(BASE_URL + "/quizzes/upload", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
    },
  });
  // let response = await (BASE_URL + "/quizzes/upload", {
  //   method: "POST",
  //   body: formData,
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //     Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
  //   },
  // });
};
