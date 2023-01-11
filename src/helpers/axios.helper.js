import { notification } from "helpers/notification.helper";

export const transformAxiosResponse = (response) => {
  const { data: payload } = response;
  return {
    payload,
    success: true,
  };
};

export const transformErrorResponse = async (errResponse) => {
  const { response, message } = errResponse;
  let payload;
  console.log('response', response)
  payload = response ? response.data : {};
  console.log('payload',payload.error.msg)
  const errorMessage = payload.error.msg
   notification({ type: "error", message: errorMessage});
  return {
    payload,
    status: response.status,
    errorMessage: message,
    success: false,
  };
};
