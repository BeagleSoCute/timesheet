import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

interface propsType {
  onFinish: (data: any) => Promise<void>;
}

const iniyialValues = {
  userName: localStorage.getItem("userName")
    ? localStorage.getItem("userName")
    : "",
  password: localStorage.getItem("password")
    ? localStorage.getItem("password")
    : "",
};

const LoginForm = ({ onFinish }: propsType) => {
  return (
    <div>
      <h1>Login</h1>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        initialValues={iniyialValues}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="User Name"
          name="userName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        {/* <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}
        <Form.Item className="button-submit-layout">
          <Button className="button-submit" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginForm;
