import { createContext, useMemo, useReducer, useEffect } from "react";
import appReducer from "reducers/app.reducer";
import { useNavigate } from "react-router-dom";
import { notification } from "helpers/notification.helper";
export const AppContext = createContext({
  loading: false,
  isAuth: false,
  remainingHours: "",
  timesheetData: {},
  allocatedData: [],
  setLoading: () => {},
  setAuth: () => {},
  setAllocatedHours: () => {},
  clearTimesheetData: () => {},
});
export const { reducer, defaultValue, TYPES } = appReducer;
export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [reducerStates, dispatch] = useReducer(reducer, defaultValue);
  const { loading, isAuth, remainingHours, timesheetData, allocatedData } =
    reducerStates;
  useEffect(() => {
    const init = async () => {
      if (!isAuth) {
        navigate("/");
        notification({ type: "warning", message: "Please sign in first!" });
      }
    };
    init();
  }, [isAuth]);

  const appContextValue = useMemo(() => {
    return {
      loading,
      isAuth,
      remainingHours,
      timesheetData,
      allocatedData,
      setLoading: (data) => {
        dispatch({ type: TYPES.SET_LOADING, payload: data });
      },
      setAuth: (data) => {
        dispatch({ type: TYPES.SET_AUTH, payload: data });
      },
      setAllocatedHours: (data) => {
        dispatch({ type: TYPES.SET_ALLOCATED_HOURS, payload: data });
      },
      clearTimesheetData: (data) => {
        dispatch({ type: TYPES.CLEAR_TIMESHEET_DATA, payload: data });
      },
      setRemainingHours: (data) => {
        dispatch({ type: TYPES.SET_REMAINING_HOURS, payload: data });
      },
    };
  }, [loading, isAuth, timesheetData, remainingHours, allocatedData, dispatch]);
  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
