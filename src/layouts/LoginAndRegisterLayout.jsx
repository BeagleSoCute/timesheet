import { useEffect } from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { notification } from "helpers/notification.helper";
import { checkIsAuth } from "helpers/auth.helper";

const LoginAndRegisterLayout = ({ children }) => {
  const navigate = useNavigate();
  const isAuth = checkIsAuth();
  useEffect(() => {
    const init = () => {
      if (isAuth) {
        notification({
          type: "warning",
          message: "Warning",
          description: "You already have loged in into the system!",
        });
        navigate("/dashboard");
      }
    };
    init();
  }, []);
  return (
    <StyledDiv className="login-and-register-layout">
      <Row>
        <Col span={8} />
        <Col className="form-warpper" span={8}>
          {children}
        </Col>
        <Col span={8} />
      </Row>
    </StyledDiv>
  );
};
const StyledDiv = styled.div`
  &.login-and-register-layout {
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

export default LoginAndRegisterLayout;
