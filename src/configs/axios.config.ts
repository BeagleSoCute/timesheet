import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import {
  transformAxiosResponse,
  transformErrorResponse,
} from "../helpers/axios.helper";
import { ErrorResponse } from "../interface/api.interface";

const apiInstance = axios.create({
  // baseURL: "/api",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

const onRequestFulfilled = (
  configs: AxiosRequestConfig = {}
): AxiosRequestConfig => {
  const token = localStorage.getItem("token");
  if (token) {
    configs.headers = {
      ...configs.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return configs;
};

const onResponseFulfilled = (response: AxiosResponse): any => {
  return transformAxiosResponse(response);
};

const onResponseRejected = async (error: ErrorResponse) => {
  return transformErrorResponse(error);
};
apiInstance.interceptors.request.use(onRequestFulfilled);
apiInstance.interceptors.response.use(onResponseFulfilled, onResponseRejected);
export { apiInstance };
