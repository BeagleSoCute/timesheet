import { ReducerType } from "contexts/types";
import dayjs from "dayjs";
import {
  defaultTimesheetData,
  defaultTimesheetAllocationData,
  defaultClockinData,
  defaultAfterCompleteAllocatedData,
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
}

interface ActionType {
  type: string;
  payload?: any;
}

const defaultValue: ReducerType = {
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
      return { ...state, allocatedData: payload };
    case EnumTYPES.CLEAR_TIMESHEET_DATA:
      return { ...state, timesheetData: {} };
    case EnumTYPES.SET_JOB_LISTS:
      return { ...state, jobLists: payload };
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
