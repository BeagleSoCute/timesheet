import React from "react";
import PropTypes from "prop-types";
import { jobOptions } from "data/options";
import { dateFormat, timeFormat } from "constants/format";
import styled from "styled-components";
import companyLogo from "assets/images/company_logo.png";
import { DatePicker, Form, InputNumber, TimePicker, Select } from "antd";
import dayjs from "dayjs";
import Button from "components/common/Button";

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
      span: 12,
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
    // const result = {
    //   ...value,
    //   startDate: dayjs(value.startDate).format(dateFormat),
    //   startTime: dayjs(value.startTime).format(timeFormat),
    // };
    onFinish(value);
  };
  const initialValues = {
    startDate: dayjs(),
    startTime: dayjs("08:00", timeFormat),
  };
  return (
    <StyledDiv className="sigin-form">
      <img className="w-full h-64  object-contain" src={companyLogo} />
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
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="pin"
          rules={[{ required: true, message: "Please input your pin!" }]}
        >
          <InputNumber className="w-full" controls={false} />
        </Form.Item>

        <div className="message-wrapper mb-0 bg-blue-900	">
          <p className="text-white font-bold	">Welcome, Brunton</p>
        </div>
        <div className="message-wrapper mb-5   bg-red-600	">
          <p className="text-white font-bold	">
            This is the Sign In screen enter your start time below
          </p>
        </div>

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
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Select Job"
          name="job"
          rules={[{ required: true, message: "Please input your Job!" }]}
        >
          <Select options={jobOptions} />
        </Form.Item>

        <Form.Item className="flex justify-center mt-8 ">
          <Button label="Sign In" type="primary" htmlType="submit" />
        </Form.Item>
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.sigin-form {
    .message-wrapper {
      p {
        padding: 10px;
        margin: 0px;
      }
    }
  }
`;

SignInForm.propTypes = propTypes;
SignInForm.defaultProps = defaultProps;
export default SignInForm;
