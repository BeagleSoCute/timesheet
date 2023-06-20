import React, { useContext, useState } from "react";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import { login } from "services/auth.services";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/app.context";

const Login = () => {
  const navigate = useNavigate();
  const { setLoading, setAuth } = useContext(AppContext);
  const handleOnFinish = async (values: any) => {
    setLoading(true);
    const mock = {
      userName: "ALISAR",
      password: "1234",
    };
    const isLoginSuccess = await login(mock);
    // if (isLoginSuccess) {
    //   const userRes = await getMyData();
    //   if (userRes.success) {
    //     setAuth(userRes.userData);
    //     navigate("/dashboard");
    //   }
    // }
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
