import axios from "axios";
import getApiBase from "./config"
import { getFromStorage } from "./utils/storage";

let accessToken: string = "";
let refreshToken: string = "";
let showLogout: () => void;


export function setTokens(access: string, refresh: string) {
  accessToken = access;
  refreshToken = refresh;
}

export function setDoLogout(doLogout: () => void) {
  showLogout = doLogout;
}

const api = axios.create({
  baseURL: getApiBase(),
});

// Attach token to all requests
api.interceptors.request.use((config : any) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Flag to avoid multiple simultaneous refresh calls
let isRefreshing = false;
let refreshQueue: Array<(newToken: string) => void> = [];

// Response interceptor handles expired tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized, try token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const res = await api.post("/auth/refresh", {
            refreshToken,
          });

          const newAccessToken = res.data.accessToken;

          // Store new token
          accessToken = newAccessToken;
          refreshToken = res.data.refreshToken;

          // Process queue
          refreshQueue.forEach((cb) => cb(newAccessToken));
          refreshQueue = [];

          isRefreshing = false;

          // Retry original call with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (err) {
          isRefreshing = false;
          refreshQueue = [];
          showLogout();
          return Promise.reject(err);
        }
      }

      // Queue up pending requests while refresh request is ongoing
      return new Promise((resolve) => {
        refreshQueue.push((newToken: string) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
