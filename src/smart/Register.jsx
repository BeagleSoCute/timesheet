import { useContext } from "react";
import styled from "styled-components";
import LoginAndRegisterLayout from "layouts/LoginAndRegisterLayout";
import RegisterForm from "components/register/RegisterForm";
import { register } from "services/register.service";
import { AppContext } from "contexts/app.context";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(AppContext);
  const handleOnFinish = async (values) => {
    setLoading(true);
    const { email, name, password } = values;
    await register({ email, name, password });
    setLoading(false);
    navigate("/login");
  };

  return (
    <StyledDiv className="register">
      <LoginAndRegisterLayout>
        <RegisterForm onFinish={handleOnFinish} />
      </LoginAndRegisterLayout>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.login {
    height: 100vh;
    .form-warpper {
      margin-top: 150px !important;
      display: block;
      padding: 20px;
      margin: auto;
      h1 {
        text-align: center;
      }
      .button-submit-layout {
        display: flex;
        justify-content: center;
      }
      button.button-submit {
        width: 250px;
      }
    }
    .content {
      height: 100%;
    }
  }
`;

export default Register;
