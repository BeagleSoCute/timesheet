import { createContext, useMemo, useReducer, useEffect } from "react";
import appReducer from "contexts/app.reducer";
import { useNavigate, useMatch } from "react-router-dom";
import { notification } from "helpers/notification.helper";
export const AppContext = createContext({
  loading: false,
  isAuth: false,
  timesheetData: {},
  allocatedData: [],
  setLoading: () => {},
  setAuth: () => {},
  setAllocatedHours: () => {},
  clearTimesheetData: () => {},
  setTimesheetData: () => {},
});
export const { reducer, defaultValue, TYPES } = appReducer;
export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const isSupervisorpath = useMatch("/supervisor/*");
  const [reducerStates, dispatch] = useReducer(reducer, defaultValue);
  const { loading, isAuth, timesheetData, allocatedData } = reducerStates;
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

  const appContextValue = useMemo(() => {
    return {
      loading,
      isAuth,
      timesheetData,
      allocatedData,
      setLoading: (data) => {
        dispatch({ type: TYPES.SET_LOADING, payload: data });
      },
      setAuth: (data) => {
        dispatch({ type: TYPES.SET_AUTH, payload: data });
      },
      setTimesheetData: (data) => {
        dispatch({ type: TYPES.SET_TIMESHEET_DATA, payload: data });
      },
      setAllocatedHours: (data) => {
        dispatch({ type: TYPES.SET_ALLOCATED_HOURS, payload: data });
      },
      clearTimesheetData: (data) => {
        dispatch({ type: TYPES.CLEAR_TIMESHEET_DATA, payload: data });
      },
    };
  }, [loading, isAuth, timesheetData, allocatedData, dispatch]);
  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
