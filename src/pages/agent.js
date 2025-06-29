import { notification } from "antd";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASE_APP_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  async (config) => config,
  async (error) => {
    throw error;  // throw instead of Promise.reject
  }
);

axios.interceptors.response.use(
  async (response) => {
    return response.data;  // no await needed
  },
  async (error) => {
    const response = error.response;
    if (response) {
      console.error('status Code :', response.status);
      console.error('reason', response.data.status);
      console.error('message:', response.status, response.data.message);

      switch (response.status) {
        case 401:
          notification.error({ message: response.data.status || "Unathorized", description: response.data?.message || "Login again" });
          return
        case 404:
          notification.error({ message: response.data.status || "404", description: response.data?.message || "Not Found" })
          return
        case 403:
          notification.error({ message: response.data.status || "403", description: response.data?.message || "Access denied" })
          return
        case 429:
          notification.error({ message: response.data.status || "429", description: response.data?.message || "Limit Exceeded" })
          return
        default:
          notification.error({ message: 'Something is wrong' })
          break
      }
      throw response.data || response;

    } else {
      console.error('Network or CORS error:', error.message);
      throw error;
    }
  }
);

export const requests = {
  get: async (url, params) => {
    try {
      const response = await axios.get(url, { params });
      return response;
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  },
};
