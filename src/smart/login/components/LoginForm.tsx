import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

interface propsType {
  onFinish: (data: any) => Promise<void>;
}

const LoginForm = ({ onFinish }: propsType) => {
  return (
    <div>
      <h1>Login</h1>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        //  initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="on"
      >
        <Form.Item
          label="Email"
          name="email"
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
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

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
