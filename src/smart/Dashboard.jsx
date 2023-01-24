import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Row, Col, Button } from "antd";
import { AppContext } from "contexts/app.context";
import { checkIsAuth } from "helpers/auth.helper";
import { getAllUsers } from "services/user.service";
import TableData from "components/common/TableData";
import { transformAllUsersDataToTable } from "helpers/user.helper";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { user, setLoading } = useContext(AppContext);

  useEffect(() => {
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
     // eslint-disable-next-line
  }, []);

  const allUserColums = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
      width: "5%",
      render: (item, record) => (
        <Button onClick={() => navigate(`/user/${record.id}`)}>View</Button>
      ),
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      width: "5%",

      render: (item, record) => <Button>Edit</Button>,
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      width: "5%",

      render: (item, record) => <Button>Delete</Button>,
    },
  ];
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
