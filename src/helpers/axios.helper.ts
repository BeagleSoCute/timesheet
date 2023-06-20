import { notification } from "./notification.helper";
import { AxiosResponse } from "axios"; // Import AxiosResponse from your Axios library
import { ErrorResponse } from "../interface/api.interface";

interface TransformedAxiosResponseType {
  payload: any;
  success: boolean;
}

export const transformAxiosResponse = (
  response: AxiosResponse
): TransformedAxiosResponseType => {
  const authorizationHeader = response.headers.authorization;
  const token = authorizationHeader ? authorizationHeader.split(" ")[1] : null;
  if (token) {
    localStorage.setItem("token", token);
  }
  return {
    payload: response.data.data,
    success: true,
  };
};

export const transformErrorResponse = (
  errResponse: ErrorResponse
): TransformedAxiosResponseType => {
  const { response, message } = errResponse;
  let payload: any;
  payload = response ? response.data : {};
  notification({ type: "error", message: message });
  return {
    payload,
    success: false,
  };
};
