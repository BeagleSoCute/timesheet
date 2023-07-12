import { ReducerType } from "contexts/types";
import dayjs from "dayjs";
import {
  defaultTimesheetData,
  defaultTimesheetAllocationData,
  defaultAfterCompleteAllocatedData,
  defaultBrakingData,
} from "defaultValue";

enum EnumTYPES {
  SET_LOADING = "SET_LOADING",
  SET_AUTH = "SET_AUTH",
  SET_NOTIFICATION = "SET_NOTIFICATION",
  SET_ALLOCATED_HOURS = "SET_ALLOCATED_HOURSs",
  CLEAR_TIMESHEET_DATA = "CLEAR_TIMESHEET_DATA",
  SET_REMAINING_HOURS = "SET_REMAINING_HOURS",
  SET_TIMESHEET_DATA = "SET_TIMESHEET_DATA",
  SET_TIMESHEET_ALLOCATION_DATA = "SET_TIMESHEET_ALLOCATION_DATA",
  SET_JOB_LISTS = "SET_JOB_LISTS",
  SET_CLOCK_IN = "SET_CLOCK_IN",
  SET_SIGNOUT_DATA = "SET_SIGNOUT_DATA",
  CLEAR_STORE = "CLEAR_STORE",
  SET_SIGNOUT_TIME = "SET_SIGNOUT_TIME",
}

interface ActionType {
  type: string;
  payload?: any;
}

const defaultValue: ReducerType = {
  loading: false,
  isAuth: false,
  signoutTime: null,
  userData: {},
  actionAPIData: null,
  clockinData: dayjs(),
  timesheetData: defaultTimesheetData,
  signoutData: null,
  timesheetAllocationData: defaultTimesheetAllocationData,
  allocatedData: defaultAfterCompleteAllocatedData,
  breakingData: defaultBrakingData,
  jobLists: [],
};

const reducer = (state: ReducerType, action: ActionType) => {
  const { payload, type } = action;
  switch (type) {
    case EnumTYPES.SET_LOADING:
      return { ...state, loading: payload };
    case EnumTYPES.SET_AUTH:
      return { ...state, isAuth: true, userData: payload };
    case EnumTYPES.SET_CLOCK_IN:
      return {
        ...state,
        clockinData: payload.startDateTime,
        actionAPIData: payload.signinData,
      };
    case EnumTYPES.SET_TIMESHEET_DATA:
      return { ...state, timesheetData: payload };
    case EnumTYPES.SET_TIMESHEET_ALLOCATION_DATA:
      return { ...state, timesheetAllocationData: payload };
    case EnumTYPES.SET_NOTIFICATION:
      return { ...state, notificationData: payload };
    case EnumTYPES.SET_ALLOCATED_HOURS:
      return {
        ...state,
        allocatedData: payload.items,
        breakingData: payload.breakingData,
      };
    case EnumTYPES.CLEAR_TIMESHEET_DATA:
      return { ...state, timesheetData: {} };
    case EnumTYPES.SET_JOB_LISTS:
      return { ...state, jobLists: payload };
    case EnumTYPES.SET_SIGNOUT_DATA:
      return { ...state, signoutData: payload };
    case EnumTYPES.SET_SIGNOUT_TIME:
      return { ...state, signoutTime: payload };
    case EnumTYPES.CLEAR_STORE:
      return {
        loading: false,
        isAuth: false,
        userData: {},
        actionAPIData: null,
        clockinData: dayjs(),
        timesheetData: defaultTimesheetData,
        timesheetAllocationData: defaultTimesheetAllocationData,
        allocatedData: defaultAfterCompleteAllocatedData,
        jobLists: [],
      };
    default:
      break;
  }
};

const appReducer = {
  TYPES: EnumTYPES,
  defaultValue,
  reducer,
};

export default appReducer;
