const TYPES = {
  SET_LOADING: "SET_LOADING",
  SET_AUTH: "SET_AUTH",
  SET_USER: "SET_USER",
  SET_NOTIFICATION: "SET_NOTIFICATION",
};

const defaultValue = {
  loading: false,
  isAuth: false,
  timesheetData: {},
  user: {},
  users: [],
};

const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case TYPES.SET_LOADING:
      return { ...state, loading: payload };
    case TYPES.SET_AUTH:
      return { ...state, isAuth: payload, timesheetData: payload };
    case TYPES.SET_USER:
      return { ...state, user: payload };
    case TYPES.SET_NOTIFICATION:
      return { ...state, notificationData: payload };
    default:
      break;
  }
};

const appReducer = {
  TYPES,
  defaultValue,
  reducer,
};

export default appReducer;
