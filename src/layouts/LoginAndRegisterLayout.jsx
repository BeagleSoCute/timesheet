import { useEffect, useContext } from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/app.context";

const LoginAndRegisterLayout = ({ children }) => {
  const navigate = useNavigate();
  const { isAuth, setNotificationData } = useContext(AppContext);
  useEffect(() => {
    const init = () => {
      if (isAuth) {
        setNotificationData({
            type: "warning",
            header: "Warning",
            description: "You already have loged in into the system!",
            isShowed: true,
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
