
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
  payload = response ? response.data : {};
  return {
    payload,
    status: response.status,
    errorMessage: message,
    success: false,
  };
};


