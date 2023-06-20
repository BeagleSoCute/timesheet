import axios, { AxiosResponse } from "axios";
import {
  transformAxiosResponse,
  transformErrorResponse,
} from "../helpers/axios.helper";
import { ErrorResponse } from "../interface/api.interface";

const apiInstance = axios.create({
  // baseURL: "/api",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${"token"}`,
    "Content-Type": "application/json",
  },
});

const onRequestFulfilled = (configs = {}) => {
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
