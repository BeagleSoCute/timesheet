import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Layout, Menu, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/app.context";
import { displayNotification } from "services/notification.service";
const { Header } = Layout;

const AppLayout = ({ children }) => {
  const { loading, isAuth, notificationData, setNotificationData } =
    useContext(AppContext);
  const [items, setItem] = useState([
    { key: 1, name: "Home", path: "/", isShowed: true },
    { key: 2, name: "Dashboard", path: "/dashboard", isShowed: true },
    { key: 3, name: "Login", path: "/login", isShowed: true },
    { key: 4, name: "Register", path: "/register", isShowed: true },
    { key: 5, name: "Profile", path: "/profile", isShowed: false },
    { key: 6, name: "Logout", path: "/logout", isShowed: false },
  ]);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("useEffect1 in AppLayout (Noti)");
    const notiCheck = async () => {
      if (notificationData.isShowed) {
        displayNotification(notificationData);
        setNotificationData({
          type: "",
          header: "",
          description: "",
          isShowed: false,
        });
      }
    };
    notiCheck();
    // eslint-disable-next-line
  }, [notificationData]);
  useEffect(() => {
    console.log("useEffect2 in AppLayout (change menu)");
    let result;
    const checkAuth = () => {
      if (isAuth === true) {
        result = items.map((item) =>
          item.name === "Login" || item.name === "Register"
            ? { ...item, isShowed: false }
            : item.name === "Logout" || item.name === "Profile"
            ? { ...item, isShowed: true }
            : item
        );
      } else {
        result = items.map((item) =>
          item.name === "Login" || item.name === "Register"
            ? { ...item, isShowed: true }
            : item.name === "Logout" || item.name === "Profile"
            ? { ...item, isShowed: false }
            : item
        );
      }
      setItem(result);
    };
    checkAuth();
    // eslint-disable-next-line
  }, [isAuth]);
  const handleOnClick = (selected) => {
    const result = items.find((item) => item.key === parseInt(selected.key));
    navigate(result.path);
  };
  return (
    <StyledLayout className="app-layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          onClick={handleOnClick}
          items={items.map((item, index) => {
            const key = index + 1;
            return (
              item.isShowed && {
                key,
                label: item.name,
              }
            );
          })}
        />
      </Header>
      <div className="content">
        {loading ? (
          <div className="spin">
            <Spin size="large">{loading}</Spin>
          </div>
        ) : (
          <>{children}</>
        )}
      </div>
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  &.app-layout {
    height: 100vh;
    .content {
      height: 100%;
      padding: 20px;
    }
    .spin {
      display: flex;
      justify-content: center;
      height: 100%;
    }
    .ant-spin {
      margin: auto;
    }
    .header {
      background: #282a3a;
      .link {
        color: white;
      }
    }
  }
`;
export default AppLayout;
