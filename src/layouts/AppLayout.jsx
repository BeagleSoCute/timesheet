import { useContext } from "react";
import styled from "styled-components";
import { Layout, Spin } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "contexts/app.context";
import { Outlet } from "react-router-dom";
import companyLogo from "assets/images/company_logo.png";

const AppLayout = () => {
  const { loading } = useContext(AppContext);
  const navigate = useNavigate();
  const handleOnClick = (selected) => {
    navigate(selected);
  };
  return (
    <StyledLayout className="app-layout">
      <div className="flex menu px-2 bg-indigo-200 justify-between">
        <Link className="text-black">
          <p className="">Exit</p>
        </Link>
        <span className="mx-auto my-auto text-lg timesheet font-bold">
          Timesheet
        </span>
      </div>
      <div className="w-full px-2 2xl:px-5 py-2 xl:px-5 lg:px-5 md:px-5 sm:px-5 h-screen bg-white">
        <img className="w-full h-64   object-contain" src={companyLogo} />
        <Spin spinning={loading} size="large">
          <Outlet />
        </Spin>
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
