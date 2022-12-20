import { useEffect, useContext } from 'react'
import styled from "styled-components";
import { Row, Col } from 'antd';
import {AppContext} from 'contexts/app.context'

const Dashboard = () => {
  const {isAuth} = useContext(AppContext);
    useEffect(() => {
    }, [])
    return (
        <StyledDiv className='dashboard'>
            <h1>Dashboard</h1>
            {isAuth ?  <Row>
                <Col span={6}>Name: </Col>
                <Col span={6}>Email: </Col>
            </Row>: <h2>Please Login into the system</h2> }
           
        </StyledDiv>
    )
}
 
const StyledDiv = styled.div`
  &.dashboard {
    /* height: 100vh; */
  }
`;
export default Dashboard