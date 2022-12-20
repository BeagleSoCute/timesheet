import { useContext } from 'react';
import styled from "styled-components";
import LoginAndRegisterLayout from 'layouts/LoginAndRegisterLayout';
import LoginForm from 'components/login/LoginForm'
import { login } from 'services/login'
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/app.context"

const Login = () => {
    const navigate = useNavigate();
    const { setLoading } = useContext(AppContext);
    const handleOnFinish = async (values) => {
        setLoading(true);
        await login(values)
        setLoading(false);
        navigate('/home')
    };

    return (
        <StyledDiv className='login'>
            <LoginAndRegisterLayout>
                <LoginForm onFinish={handleOnFinish} />
            </LoginAndRegisterLayout>
        </StyledDiv>
    )
}

const StyledDiv = styled.div`
  &.login {
  }
`;
export default Login