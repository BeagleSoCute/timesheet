import axios from "axios";
import {
  transformAxiosResponse,
  transformErrorResponse,
} from "helpers/axios.helper";
import { refreshToken } from "apis/auth.api";
import { notification } from "helpers/notification.helper";

const apiInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const onRequestFulfilled = (configs = {}) => {
  return configs;
};
const onResponseFulfilled = (response) => {
  return transformAxiosResponse(response);
};

const onResponseRejected = async (error) => {
  if (error.response && error.response.status === 401) {
    const originalRequest = error.config;
    const { success, status } = await refreshToken();
    if (success) {
      return apiInstance(originalRequest);
    } else if (status === 403) {
      notification({
        type: "warning",
        message: "Please login into the system again.",
      });
      // return window.location.replace("/login");
    }
  }
  return transformErrorResponse(error);
};
apiInstance.interceptors.request.use(onRequestFulfilled);
apiInstance.interceptors.response.use(onResponseFulfilled, onResponseRejected);
export { apiInstance };
