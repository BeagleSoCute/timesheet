import React, { createContext, useMemo, useReducer, useEffect,ReactNode } from "react";
import appReducer from "contexts/app.reducer";
import { useNavigate, useMatch } from "react-router-dom";
import { notification } from "helpers/notification.helper";
import {ReducerType} from 'contexts/types'

interface AppContextType extends ReducerType {
  setLoading: (data:boolean) => void,
  setAuth: (data:object) => void,
  setAllocatedHours: (data:Array<object>) => void,
  clearTimesheetData: () => void,
  setTimesheetData: (data:object) => void,
}

interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextType>({
  loading: false,
  isAuth: false,
  timesheetData: {pin: 0, startTime: "", job:[]},
  allocatedData: [],
  setLoading: () => {},
  setAuth: () => {},
  setAllocatedHours: () => {},
  clearTimesheetData: () => {},
  setTimesheetData: () => {},
});
export const { reducer, defaultValue, TYPES } = appReducer;
export const AppProvider = ({ children }:AppProviderProps) => {
  const navigate = useNavigate();
  const isSupervisorpath = useMatch("/supervisor/*"); 
  const [reducerStates, dispatch] = useReducer(reducer, defaultValue);
  const { loading, isAuth, timesheetData, allocatedData } = reducerStates as ReducerType;
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
      timesheetData,
      allocatedData,
      setLoading: (data:boolean) => {
        dispatch({ type: TYPES.SET_LOADING, payload: data });
      },
      setAuth: (data:object) => {
        dispatch({ type: TYPES.SET_AUTH, payload: data });
      },
      setTimesheetData: (data:object) => {
        dispatch({ type: TYPES.SET_TIMESHEET_DATA, payload: data });
      },
      setAllocatedHours: (data:Array<object>) => {
        dispatch({ type: TYPES.SET_ALLOCATED_HOURS, payload: data });
      },
      clearTimesheetData: () => {
        dispatch({ type: TYPES.CLEAR_TIMESHEET_DATA});
      },
    };
  }, [loading, isAuth, timesheetData, allocatedData, dispatch]);
  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};