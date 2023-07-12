import React, {
  createContext,
  useMemo,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import appReducer from "contexts/app.reducer";
import { useNavigate, useMatch } from "react-router-dom";
import { notification } from "helpers/notification.helper";
import { ReducerType, timesheetAllocationDataType } from "contexts/types";
import {
  timesheetAllocationAfterCompleteDataType,
  jobListsType,
  signoutDataType,
  breakingDataType,
} from "interface";
import {
  defaultTimesheetData,
  defaultTimesheetAllocationData,
  defaultAfterCompleteAllocatedData,
  defaultBrakingData,
} from "defaultValue";
import { timeSheetType } from "contexts/types";
import { LoginResponsePayload } from "interface/api.interface";
import { clockInPropsType } from "interface/index";
import dayjs, { Dayjs } from "dayjs";

interface AppContextType extends ReducerType {
  setLoading: (data: boolean) => void;
  setAuth: (data: LoginResponsePayload) => void;
  setAllocatedHours: (data: {
    items: timesheetAllocationAfterCompleteDataType[];
    breakingData: breakingDataType;
  }) => void;
  clearTimesheetData: () => void;
  setTimesheetData: (data: timeSheetType) => void;
  setTimesheetAllocationData: (data: timesheetAllocationDataType) => void;
  setJobLists: (data: jobListsType) => void;
  setClockIn: (data: clockInPropsType) => void;
  logout: () => void;
  setSignoutData: (data: signoutDataType) => void;
  setSignoutTime: (data: Dayjs) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextType>({
  loading: false,
  isAuth: false,
  clockinData: dayjs(),
  signoutData: null,
  timesheetData: defaultTimesheetData,
  timesheetAllocationData: defaultTimesheetAllocationData,
  allocatedData: defaultAfterCompleteAllocatedData,
  actionAPIData: null,
  signoutTime: null,
  jobLists: [],
  userData: {},
  breakingData: defaultBrakingData,
  setLoading: () => {},
  setAuth: () => {},
  setAllocatedHours: () => {},
  clearTimesheetData: () => {},
  setTimesheetData: () => {},
  setTimesheetAllocationData: () => {},
  setJobLists: () => {},
  setClockIn: () => {},
  setSignoutData: () => {},
  logout: () => {},
  setSignoutTime: () => {},
});

export const { reducer, defaultValue, TYPES } = appReducer;
export const AppProvider = ({ children }: AppProviderProps) => {
  const navigate = useNavigate();
  const isSupervisorpath = useMatch("/supervisor/*");
  const [reducerStates, dispatch] = useReducer(reducer, defaultValue);
  const {
    loading,
    isAuth,
    clockinData,
    signoutData,
    timesheetData,
    timesheetAllocationData,
    allocatedData,
    jobLists,
    userData,
    signoutTime,
    actionAPIData,
    breakingData,
  } = reducerStates as ReducerType;
  useEffect(() => {
    console.log("useEffect in the context...", isAuth);
    const isToken = localStorage.getItem("token");
    const isNotSupervisorPath =
      isSupervisorpath?.pathnameBase !== "/supervisor";
    const init = async () => {
      console.log("init auth", isAuth);
      if (!isToken) {
        navigate("/");
        notification({ type: "warning", message: "Please log in first!" });
      } else {
        navigate("/landing-page");
      }
    };
    init();
    // eslint-disable-next-line
  }, [isAuth]);

  const appContextValue = useMemo<AppContextType>(() => {
    return {
      loading,
      isAuth,
      clockinData,
      signoutData,
      timesheetData,
      timesheetAllocationData,
      allocatedData,
      jobLists,
      userData,
      actionAPIData,
      signoutTime,
      breakingData,
      setLoading: (data: boolean) => {
        dispatch({ type: TYPES.SET_LOADING, payload: data });
      },
      setAuth: (data: LoginResponsePayload) => {
        dispatch({ type: TYPES.SET_AUTH, payload: data });
      },
      setClockIn: (data: clockInPropsType) => {
        dispatch({ type: TYPES.SET_CLOCK_IN, payload: data });
      },
      setSignoutData: (data: signoutDataType) => {
        dispatch({ type: TYPES.SET_SIGNOUT_DATA, payload: data });
      },
      setTimesheetData: (data: timeSheetType) => {
        dispatch({ type: TYPES.SET_TIMESHEET_DATA, payload: data });
      },
      setAllocatedHours: (data: {
        items: timesheetAllocationAfterCompleteDataType[];
        breakingData: breakingDataType;
      }) => {
        dispatch({ type: TYPES.SET_ALLOCATED_HOURS, payload: data });
      },
      setTimesheetAllocationData: (data: timesheetAllocationDataType) => {
        dispatch({ type: TYPES.SET_TIMESHEET_ALLOCATION_DATA, payload: data });
      },
      clearTimesheetData: () => {
        dispatch({ type: TYPES.CLEAR_TIMESHEET_DATA });
      },
      setJobLists: (data: jobListsType) => {
        dispatch({ type: TYPES.SET_JOB_LISTS, payload: data });
      },
      logout: () => {
        dispatch({ type: TYPES.CLEAR_STORE });
      },
      setSignoutTime: (data: Dayjs) => {
        dispatch({ type: TYPES.SET_SIGNOUT_TIME, payload: data });
      },
    };
  }, [
    loading,
    isAuth,
    clockinData,
    signoutTime,
    signoutData,
    timesheetData,
    timesheetAllocationData,
    allocatedData,
    userData,
    dispatch,
  ]);
  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
