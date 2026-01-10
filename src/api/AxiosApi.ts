import axios, { AxiosError } from "axios";
import { useAuthStore } from "../store/authStore";
import type { ApiErrorResponse } from "../types/apiError";

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}
const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터
axiosApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 403) {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "/";
      }
    }

    if (status === 401) {
      // 예: 토큰 만료 에러 코드가 명확할 때만
      if (error.response?.data?.code === "TOKEN_EXPIRED") {
        useAuthStore.getState().clearAuth();
        window.location.href = "/login";
      }
    }
    // 서버 메시지를 error.message로 통일
    if (message) {
      error.message = message;
    }

    return Promise.reject(error);
  }
);

export default axiosApi;
