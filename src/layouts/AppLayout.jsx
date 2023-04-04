import { useContext } from "react";
import styled from "styled-components";
import { Layout, Spin } from "antd";
import { Link } from "react-router-dom";
import { AppContext } from "contexts/app.context";
import { Outlet } from "react-router-dom";
import companyLogo from "assets/images/company_logo.png";

const AppLayout = () => {
  const { loading } = useContext(AppContext);

  return (
    <StyledLayout className="app-layout pb-50">
      <div className="flex menu px-2  bg-indigo-200 justify-between">
        <Link className="text-black">
          <p className="">Exit</p>
        </Link>
        <span className="mx-auto my-auto text-lg timesheet font-bold ">
          Timesheet
        </span>
      </div>
      <div className="w-full px-3 2xl:px-64 xl:px-64 lg:px-5 md:px-5 sm:px-5 h-screen">
        <img
          className="w-full h-64  object-contain "
          src={companyLogo}
          alt="company logo"
        />
        <Spin spinning={loading} size="large">
          <Outlet />
        </Spin>
      </div>
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  &.app-layout {
    background-color: white;
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
