import { useEffect, useContext, Fragment } from "react";
import { checkIsAuth } from "helpers/auth.helper";
import { AppContext } from "contexts/app.context";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { setNotificationData } = useContext(AppContext);
  const isAuth = checkIsAuth(); //NOTE check cookies
  useEffect(() => {
    const init = () => {
      if (!isAuth) {
        setNotificationData({
          type: "warning",
          header: "Warning",
          description: "Please login into the system first!",
          isShowed: true,
        });
        return;
      }
    };
    init();
  }, []);
  return <Fragment>{isAuth ? children : <Navigate to="/login" />}</Fragment>;
};
export default PrivateRoute;
