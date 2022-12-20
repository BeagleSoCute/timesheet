import { createContext, useMemo, useReducer } from "react";
import appReducer from "reducers/app.reducer";

export const AppContext = createContext({
  loading: false,
  setLoading: () => {},
});
export const { reducer, defaultValue, TYPES } = appReducer;

export const AppProvider = ({ children }) => {
  const [reducerStates, dispatch] = useReducer(reducer, defaultValue);
  const { loading } = reducerStates;

  const appContextValue = useMemo(() => {
    return {
      loading,
      setLoading: (data) => {
        dispatch({ type: TYPES.SET_LOADING, payload: data });
      },
    };
  }, [loading, dispatch]);
  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
