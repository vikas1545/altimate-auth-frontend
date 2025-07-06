import { notification } from "antd";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASE_APP_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  async (config) => {
    const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));

    if (loginInfo) {
      config.headers.Authorization = `Bearer ${loginInfo?.token}`
    }
    return config
  },
  async (error) => {
    throw error;
  }
);

axios.interceptors.response.use(
  async (response) => {
    return response?.data;
  },
  async (error) => {
    const response = error.response;
    if (response) {
      const { status, error, message, details } = response.data;

      switch (status) {
        case 401:
          notification.error({ message: error || "Unathorized", description: message || "Login again" });
          return
        case 404:
          notification.error({ message: error || "404", description: message || "Not Found" })
          return
        case 403:
          notification.error({ message: error || "403", description: message || "Access denied" })
          return
        case 429:
          notification.error({ message: error || "429", description: details || "Limit Exceeded" })
          return
        default:
          notification.error({ message: message || 'Something is wrong' })
          return
        // break
      }

      //throw response.data || response;

    } else {
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
      throw error;
    }
  },

  post: async (url, payload) => {
    try {
      const response = await axios.post(url, payload);
      console.log('response info:', response)
      return response;
    } catch (error) {
      throw error;
    }
  },
};
