const TYPES = {
  SET_LOADING: "SET_LOADING",
  SET_AUTH: "SET_AUTH",
  SET_USER: "SET_USER",
  SET_NOTIFICATION: "SET_NOTIFICATION",
  SET_ALLOCATED_HOURS: "SET_ALLOCATED_HOURSs",
  CLEAR_TIMESHEET_DATA: "CLEAR_TIMESHEET_DATA",
};

const defaultValue = {
  loading: false,
  isAuth: false,
  timesheetData: {},
  user: {},
  users: [],
  allocatedData: [],
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
    case TYPES.SET_ALLOCATED_HOURS:
      return { ...state, allocatedData: payload };
    case TYPES.CLEAR_TIMESHEET_DATA:
      return { ...state, timesheetData: {} };
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
