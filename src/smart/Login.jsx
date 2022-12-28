import { useContext } from "react";
import styled from "styled-components";
import LoginAndRegisterLayout from "layouts/LoginAndRegisterLayout";
import LoginForm from "components/login/LoginForm";
import { login } from "services/login";
import { getMyData } from "services/user.service";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/app.context";

const Login = () => {
  const navigate = useNavigate();
  const { setLoading, setAuth, setUser, setNotificationData } = useContext(AppContext);
  const handleOnFinish = async (values) => {
    setLoading(true);
    const authRes = await login(values);
    const userRes = await getMyData(authRes.token);
    if (authRes.success && userRes.success) {
      setNotificationData({type:'success', header:'Success', description:'Login success', isShowed: true});
      setAuth(true);
      setUser(userRes.userData);
      setLoading(false);
      navigate("/dashboard");
    } else {
      setNotificationData({type:'fail', header:'Fail', description:'Login fail', isShowed: true});
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
