import { useContext } from "react";
import styled from "styled-components";
import { Layout, Menu, Spin } from 'antd';
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/app.context"

const { Header } = Layout;
const items = [
  { key: 1, name: 'Home', path: '/' },
  { key: 2, name: 'Dashboard', path: '/dashboard' },
  { key: 3, name: 'Login', path: '/login' },
  { key: 4, name: 'Register', path: '/register' },
]
const AppLayout = ({ children }) => {
  const { loading } = useContext(AppContext);
  const navigate = useNavigate();
  const handleOnClick = (selected) => {
    const result = items.find(item => item.key === parseInt(selected.key))
    navigate(result.path);
  }
  return (
    <StyledLayout className="app-layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['0']}
          onClick={handleOnClick}
          items={items.map((item, index) => {
            const key = index + 1;
            return {
              key,
              label: item.name,
            };
          })}
        />
      </Header>
      <div className="content">
        {loading ? <div className="spin"> <Spin size="large"></Spin> </div>
          : <>{children}</>
        }
      </div>
    </StyledLayout >
  );
};

const StyledLayout = styled(Layout)`
  &.app-layout {
    height: 100vh ;
    .content{
      height:100%;
      padding: 20px;

    }
    .spin{
           display:flex;
           justify-content:center;
           height:100%;
        }
        .ant-spin{
          margin: auto ;

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
