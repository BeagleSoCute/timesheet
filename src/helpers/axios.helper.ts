import { notification } from "./notification.helper";
import { ErrorResponse } from "../interface/api.interface";
import { removeLocalStorage } from "../helpers/localstorage.helper";

interface TransformedAxiosResponseType {
  payload: any;
  success: boolean;
}

export const transformAxiosResponse = (
  response: any
): TransformedAxiosResponseType => {
  const authorizationHeader = response.headers.authorization;
  const token = authorizationHeader ? authorizationHeader.split(" ")[1] : null;
  if (token) {
    localStorage.setItem("token", token);
  }
  if (response.data.code === 401) {
    removeLocalStorage();
    window.location.href = "/";
    return {
      success: false,
      payload: undefined,
    };
  }
  if (response.data.code !== 200) {
    console.log("API error", response.data.msg);
    console.log("API response.data.code", response.data.code);

    return {
      success: false,
      payload: undefined,
    };
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
