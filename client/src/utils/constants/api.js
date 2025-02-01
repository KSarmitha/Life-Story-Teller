const BASE_URL = "http://localhost:3001";

export const API_PATHS = {
  USER: `${BASE_URL}/user`,
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,
  STORY: `${BASE_URL}/story`,
  CHAT: `${BASE_URL}/chat`,
};
