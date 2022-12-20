import { useEffect } from 'react'
import styled from "styled-components";
import { Row, Col } from 'antd';

const Dashboard = () => {
    useEffect(() => {
    }, [])
    return (
        <StyledDiv className='dashboard'>

            <h1>Dashboard</h1>
            <Row>
                <Col span={6}>Name: </Col>
                <Col span={6}>Email: </Col>
            </Row>

        </StyledDiv>
    )
}

const StyledDiv = styled.div`
  &.dashboard {
    /* height: 100vh; */
  }
`;
export default Dashboard