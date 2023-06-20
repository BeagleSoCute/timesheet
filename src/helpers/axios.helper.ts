import { notification } from "./notification.helper";
import { AxiosResponse } from "axios"; // Import AxiosResponse from your Axios library

interface TransformedAxiosResponseType {
  payload: any;
  success: boolean;
}

export const transformAxiosResponse = (
  response: AxiosResponse
): TransformedAxiosResponseType => {
  return {
    payload: response.data.data,
    success: true,
  };
};
interface ErrorResponse {
  response: {
    //  status: number;
    data: any;
  };
  message: string;
}

interface TransformedErrorResponse {
  payload: any;
  errorMessage: string;
  success: boolean;
}

export const transformErrorResponse = async (
  errResponse: ErrorResponse
): Promise<TransformedAxiosResponseType> => {
  const { response, message } = errResponse;
  let payload: any;
  payload = response ? response.data : {};
  notification({ type: "error", message: message });
  return {
    payload,
    success: false,
  };
};
