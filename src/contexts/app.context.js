import { createContext, useMemo, useReducer } from "react";
import appReducer from "reducers/app.reducer";

export const AppContext = createContext({
  loading: false,
  isAuth: false,
  user: {},
  userLists: [],
  notificationData: {},
  setLoading: () => {},
  setAuth: () => {},
  setUser: () => {},
  setUserLists: () => {},
  setNotificationData: () => {},
});
export const { reducer, defaultValue, TYPES } = appReducer;
export const AppProvider = ({ children }) => {
  const [reducerStates, dispatch] = useReducer(reducer, defaultValue);
  const { loading, isAuth, user, userLists, notificationData } = reducerStates;
  const appContextValue = useMemo(() => {
    return {
      loading,
      isAuth,
      user,
      userLists,
      notificationData,
      setLoading: (data) => {
        dispatch({ type: TYPES.SET_LOADING, payload: data });
      },
      setAuth: (data) => {
        dispatch({ type: TYPES.SET_AUTH, payload: data });
      },
      setUser: (data) => {
        dispatch({ type: TYPES.SET_USER, payload: data });
      },
      setUserLists: (data) => {
        dispatch({ type: TYPES.SET_USER_LISTS, payload: data });
      },
      setNotificationData: (data) => {
        dispatch({ type: TYPES.SET_NOTIFICATION, payload: data });
      },
    };
  }, [loading, isAuth, user, userLists, notificationData, dispatch]);
  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
