import {ReducerType} from 'contexts/types'
import {defaultTimesheetData} from 'defaultValue'

enum EnumTYPES  {
  SET_LOADING = "SET_LOADING",
  SET_AUTH = "SET_AUTH",
  SET_NOTIFICATION = "SET_NOTIFICATION",
  SET_ALLOCATED_HOURS = "SET_ALLOCATED_HOURSs",
  CLEAR_TIMESHEET_DATA = "CLEAR_TIMESHEET_DATA",
  SET_REMAINING_HOURS = "SET_REMAINING_HOURS",
  SET_TIMESHEET_DATA = "SET_TIMESHEET_DATA",
};


interface ActionType {
  type: string;
  payload?: any;
}

const defaultValue:ReducerType = {
  loading: false,
  isAuth: false,
  timesheetData: defaultTimesheetData,
  allocatedData: [],
};

const reducer = (state:ReducerType, action:ActionType) => {
  const { payload, type } = action;
  switch (type) {
    case EnumTYPES.SET_LOADING:
      return { ...state, loading: payload };
    case EnumTYPES.SET_AUTH:
      return { ...state, isAuth: payload, timesheetData: payload };
    case EnumTYPES.SET_TIMESHEET_DATA:
      return { ...state, timesheetData: payload };
    case EnumTYPES.SET_NOTIFICATION:
      return { ...state, notificationData: payload };
    case EnumTYPES.SET_ALLOCATED_HOURS:
      return { ...state, allocatedData: payload };
    case EnumTYPES.CLEAR_TIMESHEET_DATA:
      return { ...state, timesheetData: {} };
    default:
      break;
  }
};

const appReducer = {
  TYPES:EnumTYPES,
  defaultValue,
  reducer,
};

export default appReducer;
