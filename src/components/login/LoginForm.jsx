import React from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox, Form, Input } from 'antd';

const propTypes = {
    onFinish: PropTypes.func,
};
const defaultProps = {
    onFinish: () => { }
};
const LoginForm = ({ onFinish }) => {
    return (
        <div>
            <h1>Login</h1>
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item className='button-submit-layout'>
                    <Button className='button-submit' type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

    )
}

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;
export default LoginForm