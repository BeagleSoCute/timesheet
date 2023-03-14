import React from "react";
import PropTypes from "prop-types";
import { jobOptions } from "data/options";
import { dateFormat, timeFormat } from "constants/format";

import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  TimePicker,
  Select,
  Alert,
} from "antd";
import dayjs from "dayjs";

const propTypes = {
  onFinish: PropTypes.func,
};
const defaultProps = {
  onFinish: () => {},
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
  },
};

const SignInForm = ({ onFinish }) => {
  const [form] = Form.useForm();

  const handleOnFinish = (value) => {
    const result = {
      ...value,
      startDate: dayjs(value.startDate).format(dateFormat),
      startTime: dayjs(value.startTime).format(timeFormat),
    };
    onFinish(result);
  };
  const initialValues = {
    startDate: dayjs(),
    startTime: dayjs("08:00", timeFormat),
  };
  return (
    <div className="sigin-form">
      <h1 className="text-center mb-5">Sign in</h1>
      <Alert className="mb-8" message="Welcome, Brunton" type="info" />
      <Form
        form={form}
        name="basic"
        {...formItemLayout}
        initialValues={initialValues}
        onFinish={handleOnFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Enter Pin"
          name="pin"
          rules={[{ required: true, message: "Please input your pin!" }]}
        >
          <InputNumber controls={false} />
        </Form.Item>

        <Form.Item label="Start Date" name="startDate">
          <DatePicker inputReadOnly format={dateFormat} allowClear={false} />
        </Form.Item>
        <Form.Item label="Start Time" name="startTime">
          <TimePicker
            showNow={false}
            inputReadOnly
            format={timeFormat}
            allowClear={false}
          />
        </Form.Item>
        <Form.Item
          label="Select Job"
          name="job"
          rules={[{ required: true, message: "Please input your Job!" }]}
        >
          <Select options={jobOptions} />
        </Form.Item>

        <Form.Item className="button-submit-layout flex justify-center mt-8 ">
          <Button className="button-submit  " type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

SignInForm.propTypes = propTypes;
SignInForm.defaultProps = defaultProps;
export default SignInForm;
