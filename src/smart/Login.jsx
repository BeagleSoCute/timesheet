import { useContext } from "react";
import styled from "styled-components";
import LoginAndRegisterLayout from "layouts/LoginAndRegisterLayout";
import LoginForm from "components/login/LoginForm";
import { login } from "services/login";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/app.context";

const Login = () => {
  const navigate = useNavigate();
  const { setLoading, setAuth } = useContext(AppContext);
  const handleOnFinish = async (values) => {
    setLoading(true);
    const isSuccess = await login(values);
    if (isSuccess) {
      setAuth(true);
      setLoading(false)
      navigate("/dashboard");
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
