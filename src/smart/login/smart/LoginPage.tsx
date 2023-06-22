import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import { login } from "services/auth.services";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/app.context";
import { LoginRequest } from "interface/api.interface";

const Login = () => {
  const navigate = useNavigate();
  const { setLoading, setAuth } = useContext(AppContext);
  useEffect(() => {
    const init = () => {
      if (localStorage.getItem("token")) {
        navigate("clockin-page");
      }
    };
    init();
  }, [navigate]);
  const handleOnFinish = async (values: LoginRequest) => {
    setLoading(true);
    const { success, payload } = await login(values);
    setLoading(false);
    if (!success) {
      return;
    }
    await setAuth(payload);
    navigate("/clockin-page");
    return;
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
