import { useContext } from "react";
import styled from "styled-components";
import LoginAndRegisterLayout from "layouts/LoginAndRegisterLayout";
import LoginForm from "components/login/LoginForm";
import { login } from "services/auth.service";
import { getMyData } from "services/user.service";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/app.context";
import { checkIsAuth } from "helpers/auth.helper";

const Login = () => {
  const navigate = useNavigate();
  const { setLoading, setUser, setNotificationData, setAuth } =
    useContext(AppContext);
  const handleOnFinish = async (values) => {
    setLoading(true);
    const authRes = await login(values);
    const userRes = await getMyData();
    if (authRes.success && userRes.success) {
      const resCheckAuth = checkIsAuth();
      setNotificationData({
        type: "success",
        header: "Success",
        description: "Login success",
        isShowed: true,
      });
      setAuth(resCheckAuth);
      setUser(userRes.userData);
      setLoading(false);
      navigate("/dashboard");
    } else {
      setNotificationData({
        type: "error",
        header: "Fail",
        description: "Login fails",
        isShowed: true,
      });
      setLoading(false);
    }
  };
  return (
    <StyledDiv className="login">
      <LoginAndRegisterLayout>
        <LoginForm onFinish={handleOnFinish} />
      </LoginAndRegisterLayout>
    </StyledDiv>
  );
};
const StyledDiv = styled.div`
  &.login {
  }
`;
export default Login;
