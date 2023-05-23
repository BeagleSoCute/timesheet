import { useContext } from "react";
import styled from "styled-components";
import { Layout, Spin, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { AppContext } from "contexts/app.context";
import { Outlet } from "react-router-dom";
import companyLogo from "assets/images/company_logo.png";

const AppLayout = () => {
  const { loading } = useContext(AppContext);
  return (
    <StyledLayout className="app-layout ">
      <Row className="flex menu px-2  bg-indigo-200">
        <Col span={8}>
          <Row>
            <Link to="/" className="text-black mr-6">
              <p className="">Exit</p>
            </Link>
            <Link to="supervisor/select-employee" className="text-black ">
              <p className="">Supervisor</p>
            </Link>
          </Row>
        </Col>
        <Col className="my-auto" span={8}>
          <span className="h-100  text-lg timesheet font-bold fixeds  left-0 right-0 flex justify-center  ">
            Timesheet
          </span>
        </Col>
        <Col span={8}></Col>
      </Row>
      <div className="w-full px-2 2xl:px-64 xl:px-64 lg:px-5 md:px-5 sm:px-5 h-screen ">
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
