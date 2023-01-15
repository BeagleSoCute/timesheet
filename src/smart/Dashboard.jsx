import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import { AppContext } from "contexts/app.context";
import { checkIsAuth } from "helpers/auth.helper";
import { getAllUsers } from "services/user.service";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const { user, setLoading } = useContext(AppContext);
  useEffect(() => {
    setLoading(true);
    const init = async () => {
      const { success, allUsersData } = await getAllUsers();
      if (success) {
        setUsers(allUsersData);
      }
    };
    init();
    setLoading(false);
  }, []);
  return (
    <StyledDiv className="dashboard">
      <h1>Dashboard</h1>
      {checkIsAuth() ? (
        <Row>
          <Col span={6}>Name: {user.name} </Col>
          <Col span={6}>Email:{user.email} </Col>
        </Row>
      ) : (
        <h2>Please Login into the system</h2>
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.dashboard {
    /* height: 100vh; */
  }
`;
export default Dashboard;
