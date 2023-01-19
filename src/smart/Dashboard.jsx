import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import { AppContext } from "contexts/app.context";
import { checkIsAuth } from "helpers/auth.helper";
import { getAllUsers } from "services/user.service";
import TableData from "components/common/TableData";
import { transformAllUsersDataToTable } from "helpers/user.helper";
import { allUserColums } from "constants/tableData";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const { user, setLoading } = useContext(AppContext);
  useEffect(() => {
    console.log("Dashboard UseEffect");
    setLoading(true);
    const init = async () => {
      const { success, allUsersData } = await getAllUsers();
      if (success) {
        const tableData = transformAllUsersDataToTable(allUsersData);
        setUsers(tableData);
      }
    };
    init();
    setLoading(false);
  }, []);
  return (
    <StyledDiv className="dashboard">
      <h1>Dashboard</h1>
      {checkIsAuth() ? (
        <div>
          <Row className="myInfo">
            <Col span={6}>Name: {user.name} </Col>
            <Col span={6}>Email:{user.email} </Col>
          </Row>
          <TableData columns={allUserColums} data={users} />
        </div>
      ) : (
        <h2>Please Login into the system</h2>
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.dashboard {
    height: 100vh;
    .myInfo {
      margin-bottom: 20px;
    }
  }
`;
export default Dashboard;
