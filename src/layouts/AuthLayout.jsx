import { useEffect, useContext } from "react";
import { isHasTokenInStorage } from "helpers/auth.helper";
import { AppContext } from "contexts/app.context";
import { getMyData } from "services/user.service";

const AuthLayout = ({ children }) => {
  const { isAuth, setAuth, setLoading, setUser } = useContext(AppContext);
  const token = isHasTokenInStorage();
  useEffect(() => {
    const checAuth = async () => {
      setLoading(true);
      if (token && !isAuth) {
        const { success, userData } = await getMyData(token);
        if (success) {
          setUser(userData);
          setAuth(true);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };
    checAuth();
  }, []);

  return (
    <div>
        {children}
    </div>
  )
};

export default AuthLayout;
