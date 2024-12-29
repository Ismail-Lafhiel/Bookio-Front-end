import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { fetchAuthSession } from "aws-amplify/auth";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const { tokens } = await fetchAuthSession();
      const token = tokens?.accessToken?.toString();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.error("Auth error:", error);
      return config;
    }
  },
  (error: AxiosError) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { tokens } = await fetchAuthSession();
        const token = tokens?.accessToken?.toString();

        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh error:", refreshError);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 403) {
      window.location.href = "/forbidden";
    }

    return Promise.reject(error);
  }
);
export default api;
