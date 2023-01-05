export const transformAxiosResponse = (response) => {
  const { data: payload } = response;
  return {
    payload,
    success: true,
  };
};

export const transformErrorResponse = (errResponse) => {
  const { response, message } = errResponse;
  let payload;
  payload = response ? response.data.payload : {};
  return {
    payload,
    status: response.status,
    errorMessage: message,
    success: false,
  };
};
