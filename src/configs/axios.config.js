import axios from "axios";
import {
  transformAxiosResponse,
  transformErrorResponse,
} from "helpers/axios.helper";

const apiInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const onRequestFulfilled = (configs = {}) => {
  console.log("confi", configs);
  return configs;
};
const onResponseFulfilled = (response) => {
  return transformAxiosResponse(response);
};

const onResponseRejected = (error) => {
  return transformErrorResponse(error);
};

apiInstance.interceptors.request.use(onRequestFulfilled);
apiInstance.interceptors.response.use(onResponseFulfilled, onResponseRejected);

export { apiInstance };
