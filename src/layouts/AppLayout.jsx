import { useContext } from "react";
import styled from "styled-components";
import { Layout, Menu, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/app.context";
import { Outlet } from "react-router-dom";
const { Header } = Layout;
const menuItems = [{ key: 1, label: "Home", path: "/" }];
const AppLayout = () => {
  const { loading } = useContext(AppContext);
  const navigate = useNavigate();
  const handleOnClick = (selected) => {
    navigate(selected);
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
          items={menuItems}
        />
      </Header>
      <div className="container mx-auto my-10 w-6/12 p-16 bg-white border-solid border-4 border-gray-300">
        {loading ? (
          <div className="spin">
            <Spin size="large">{loading}</Spin>
          </div>
        ) : (
          <>
            <Outlet className="" />
          </>
        )}
      </div>
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  &.app-layout {
    /* height: 100vh; */
    .spin {
      display: flex;
      justify-content: center;
      height: 100%;
    }
    .ant-spin {
      margin: auto;
    }
  }
`;
export default AppLayout;
