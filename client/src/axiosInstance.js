import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "./utils/constants/api";

const axiosInstance = axios.create({
  baseURL: API_PATHS.BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.message === "jwt expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(
          API_PATHS.REFRESH_TOKEN,
          {},
          { withCredentials: true }
        );
        localStorage.setItem("token", refreshResponse.data.accessToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${refreshResponse.data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");
        useNavigate()("/login");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
