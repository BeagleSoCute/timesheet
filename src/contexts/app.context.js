import { createContext, useMemo, useReducer, useEffect } from "react";
import appReducer from "reducers/app.reducer";
import { getMyData } from "services/user.service";
import { checkIsAuth } from "helpers/auth.helper";

export const AppContext = createContext({
  loading: false,
  isAuth: false,
  user: {},
  userLists: [],
  setLoading: () => {},
  setUser: () => {},
  setUserLists: () => {},
});
export const { reducer, defaultValue, TYPES } = appReducer;
export const AppProvider = ({ children }) => {
  const [reducerStates, dispatch] = useReducer(reducer, defaultValue);
  const { loading, isAuth, user, userLists } = reducerStates;

  useEffect(() => {
    dispatch({ type: TYPES.SET_LOADING, payload: true });
    const resCheckAuth = checkIsAuth();
    const init = async () => {
      const { success, userData } = await getMyData();
      if (success) {
        dispatch({ type: TYPES.SET_USER, payload: userData });
      }
    };
    if (resCheckAuth) {
      init();
    }
    dispatch({ type: TYPES.SET_LOADING, payload: false });

  }, []);

  const appContextValue = useMemo(() => {
    return {
      loading,
      isAuth,
      user,
      userLists,
      setLoading: (data) => {
        dispatch({ type: TYPES.SET_LOADING, payload: data });
      },
      setUser: (data) => {
        dispatch({ type: TYPES.SET_USER, payload: data });
      },
      setUserLists: (data) => {
        dispatch({ type: TYPES.SET_USER_LISTS, payload: data });
      },
    };
  }, [loading, isAuth, user, userLists, dispatch]);
  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
