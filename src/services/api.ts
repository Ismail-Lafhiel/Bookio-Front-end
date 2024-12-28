import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { fetchAuthSession } from "aws-amplify/auth";

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Get the current session using the new syntax
      const { tokens } = await fetchAuthSession();
      const token = tokens?.accessToken?.toString();

      // Add token to header
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      // Handle error or proceed without token
      return config;
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // Handle 401 (Unauthorized) errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh the session using the new syntax
        const { tokens } = await fetchAuthSession();
        const token = tokens?.accessToken?.toString();

        // Update the token in the original request
        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 (Forbidden) errors
    if (error.response?.status === 403) {
      window.location.href = "/forbidden";
    }

    return Promise.reject(error);
  }
);

export default api;
