import { useEffect, useContext } from "react";
import { checkIsAuth } from "helpers/auth.helper";
import { AppContext } from "contexts/app.context";
import { getMyData } from "services/user.service";

const AuthLayout = ({ children }) => {
  const { setLoading, setUser, setAuth } =
    useContext(AppContext);
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const resCheckAuth = checkIsAuth(); //NOTE check cookies
      setAuth(resCheckAuth);
      if (resCheckAuth) {
        const { success, userData } = await getMyData();
        if (success) {
          setUser(userData);
        }
      }
      setLoading(false);
    };
    checkAuth();
    // eslint-disable-next-line
  }, []);
  return <div>{children}</div>;
};
export default AuthLayout;
