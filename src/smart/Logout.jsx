import { useEffect, useContext } from "react";
import { logout } from "services/auth.service";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/app.context";
import { checkIsAuth } from "helpers/auth.helper";

const Logout = () => {
  const navigate = useNavigate();
  const { isAuth, setLoading, setNotificationData, setAuth } =
    useContext(AppContext);
  useEffect(() => {
    console.log("useEffect in logout");
    const init = async () => {
      if (!isAuth) {
        setNotificationData({
          isShowed: true,
          type: "warning",
          header: "Warning",
          description:
            "You are not logging in, please login into the system first.",
        });
        navigate("/login");
        return;
      }
      setLoading(true);
      const success = await logout();
      if (success) {
        const resCheckAuth = checkIsAuth();
        setAuth(resCheckAuth);
        setNotificationData({
          isShowed: true,
          type: "success",
          header: "Success",
          description: "Logout Success",
        });
        navigate("/login");
      } else {
        setNotificationData({
          isShowed: true,
          type: "error",
          header: "Error",
          description: "Login Fail",
        });
      }
      setLoading(false);
    };
    init();
  }, []);
};

export default Logout;
