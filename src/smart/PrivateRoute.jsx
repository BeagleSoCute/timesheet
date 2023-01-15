import { useEffect, Fragment } from "react";
import { checkIsAuth } from "helpers/auth.helper";
import { Navigate } from "react-router-dom";
import { notification } from "helpers/notification.helper";

const PrivateRoute = ({ children }) => {
  const isAuth = checkIsAuth(); //NOTE check cookies
  useEffect(() => {
    const init = () => {
      if (!isAuth) {
        notification({
          type: "warning",
          message: "Warning",
          description: "Please login into the system!",
        });
        return;
      }
    };
    init();
  }, []);
  return <Fragment>{isAuth ? children : <Navigate to="/login" />}</Fragment>;
};
export default PrivateRoute;
