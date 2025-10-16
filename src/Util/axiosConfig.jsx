// src/Util/axiosConfig.js
import axios from "axios";
import { base_URL } from "./apiEndpoints";

const axiosConfig = axios.create({
  baseURL: base_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // optional:
  // timeout: 10000,
});

const excludeEndpoints = ["/login", "/register", "/status", "/activate", "/hello"];

axiosConfig.interceptors.request.use(
  (config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );
    if (!shouldSkipToken) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      } else if (error.response.status === 403) {
        console.error("Access denied. Please check your permissions.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
