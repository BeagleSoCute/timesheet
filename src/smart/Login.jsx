import { useContext } from "react";
import styled from "styled-components";
import LoginForm from "components/login/LoginForm";
import { login } from "services/auth.service";
import { getMyData } from "services/user.service";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/app.context";

const Login = () => {
  const navigate = useNavigate();
  const { setLoading, setUser } = useContext(AppContext);
  const handleOnFinish = async (values) => {
    setLoading(true);
    const isLoginSuccess = await login(values);
    if (isLoginSuccess) {
      const userRes = await getMyData();
      if (userRes.success) {
        setUser(userRes.userData);
        navigate("/dashboard");
      }
    }
    setLoading(false);
  };
  return (
    <StyledDiv className="login">
      <LoginForm onFinish={handleOnFinish} />
    </StyledDiv>
  );
};
const StyledDiv = styled.div`
  &.login {
  }
`;
export default Login;
