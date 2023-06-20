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
} from "interface";
import {
  defaultTimesheetData,
  defaultTimesheetAllocationData,
  defaultSigninData,
  defaultAfterCompleteAllocatedData,
} from "defaultValue";
import { Dayjs } from "dayjs";
import { timeSheetType } from "contexts/types";

interface AuthPropsType {
  pin: number;
  startDateTime: Dayjs;
  job: string[];
}
interface AppContextType extends ReducerType {
  setLoading: (data: boolean) => void;
  setAuth: (data: AuthPropsType) => void;
  setAllocatedHours: (data: timesheetAllocationAfterCompleteDataType[]) => void;
  clearTimesheetData: () => void;
  setTimesheetData: (data: timeSheetType) => void;
  setTimesheetAllocationData: (data: timesheetAllocationDataType) => void;
  setJobLists: (data: jobListsType) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextType>({
  loading: false,
  isAuth: false,
  signinData: defaultSigninData,
  timesheetData: defaultTimesheetData,
  timesheetAllocationData: defaultTimesheetAllocationData,
  allocatedData: defaultAfterCompleteAllocatedData,
  jobLists: [],
  setLoading: () => {},
  setAuth: () => {},
  setAllocatedHours: () => {},
  clearTimesheetData: () => {},
  setTimesheetData: () => {},
  setTimesheetAllocationData: () => {},
  setJobLists: () => {},
});
export const { reducer, defaultValue, TYPES } = appReducer;
export const AppProvider = ({ children }: AppProviderProps) => {
  const navigate = useNavigate();
  const isSupervisorpath = useMatch("/supervisor/*");
  const [reducerStates, dispatch] = useReducer(reducer, defaultValue);
  const {
    loading,
    isAuth,
    signinData,
    timesheetData,
    timesheetAllocationData,
    allocatedData,
    jobLists,
  } = reducerStates as ReducerType;
  useEffect(() => {
    const init = async () => {
      if (!isAuth && isSupervisorpath?.pathnameBase !== "/supervisor") {
        navigate("/");
        notification({ type: "warning", message: "Please sign in first!" });
      }
    };
    init();
    // eslint-disable-next-line
  }, [navigate, isAuth]);

  const appContextValue = useMemo<AppContextType>(() => {
    return {
      loading,
      isAuth,
      signinData,
      timesheetData,
      timesheetAllocationData,
      allocatedData,
      jobLists,
      setLoading: (data: boolean) => {
        dispatch({ type: TYPES.SET_LOADING, payload: data });
      },
      setAuth: (data: AuthPropsType) => {
        dispatch({ type: TYPES.SET_AUTH, payload: data });
      },
      setTimesheetData: (data: timeSheetType) => {
        dispatch({ type: TYPES.SET_TIMESHEET_DATA, payload: data });
      },
      setAllocatedHours: (data: timesheetAllocationAfterCompleteDataType[]) => {
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
    };
  }, [
    loading,
    isAuth,
    signinData,
    timesheetData,
    timesheetAllocationData,
    allocatedData,
    dispatch,
  ]);
  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
