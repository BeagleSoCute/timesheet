import axios from "axios";
import {
  transformAxiosResponse,
  transformErrorResponse,
} from "../helpers/axios.helper";

const apiInstance = axios.create({
  // baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const onRequestFulfilled = (configs = {}) => {
  return configs;
};
const onResponseFulfilled = (response: any): any => {
  return transformAxiosResponse(response);
};

const onResponseRejected = async (error: any) => {
  //const statusError = error.response.status;
  console.log("error", error);
  return transformErrorResponse(error);
};
apiInstance.interceptors.request.use(onRequestFulfilled);
apiInstance.interceptors.response.use(onResponseFulfilled, onResponseRejected);
export { apiInstance };
