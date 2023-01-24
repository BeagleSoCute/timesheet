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
  let payload, errorMessage;
  payload = response ? response.data : {};
  if (response.status === 500 ) {
    notification({
      type: "error",
      message: "Server error, please contact the admin",
    });
  } else {
    errorMessage = payload.error?.msg;
    notification({ type: "error", message: errorMessage });
  }

  return {
    payload,
    status: response.status,
    errorMessage: message,
    success: false,
  };
};
