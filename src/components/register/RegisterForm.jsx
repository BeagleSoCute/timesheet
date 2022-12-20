import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input } from 'antd';

const propTypes = {
    onFinish: PropTypes.func,
};
const defaultProps = {
    onFinish: () => { }
};

const RegisterForm = ({ onFinish }) => {
    return (
        <div>
            <h1>Register</h1>
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
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
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

                <Form.Item
                    label="Confirm Password"
                    name="confirm_password"
                    rules={[{ required: true, message: 'Please confirm yout password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item className='button-submit-layout'>
                    <Button className='button-submit' type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form></div >
    )
}

RegisterForm.propTypes = propTypes
RegisterForm.defaultProps = defaultProps;
export default RegisterForm