import {
  ACCESS_TOKEN_KEY,
  BASE_URL,
} from "../utils/constants";

const axios = require("axios");
const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;
//     if (
//       error.response.status === 403 &&
//       !originalRequest._retry &&
//       !(
//         originalRequest.config.url.endsWith("signup") ||
//         originalRequest.config.url.endsWith("signin")
//       )
//     ) {
//       originalRequest._retry = true;
//       const access_token = await refreshTokenReq(
//         localStorage.getItem(REFRESH_TOKEN_KEY)
//       );
//       axios.default.headers.common["Authorization"] = "Bearer " + access_token;
//       return apiClient(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;
