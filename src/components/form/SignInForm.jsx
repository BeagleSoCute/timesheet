import React from "react";
import PropTypes from "prop-types";
import { jobOptions } from "data/options";
import { dateFormat, timeFormat } from "constants/format";
import styled from "styled-components";
import { DatePicker, Form, InputNumber, TimePicker, Select } from "antd";
import dayjs from "dayjs";
import Button from "components/common/Button";
import Message from "components/common/Message";

const propTypes = {
  onFinish: PropTypes.func,
};
const defaultProps = {
  onFinish: () => {},
};

const SignInForm = ({ onFinish }) => {
  const [form] = Form.useForm();
  const handleOnFinish = (value) => {
    onFinish(value);
  };
  const initialValues = {
    startDate: dayjs(),
    startTime: dayjs("08:00", timeFormat),
  };
  return (
    <StyledDiv className="sigin-form">
      <Form
        form={form}
        name="basic"
        requiredMark={false}
        initialValues={initialValues}
        onFinish={handleOnFinish}
        autoComplete="off"
      >
        <Form.Item
          className="full-content"
          colon={false}
          label="Enter Pin *"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="pin"
          rules={[{ required: true, message: "Please input your pin!" }]}
        >
          <InputNumber className="w-full" controls={false} />
        </Form.Item>
        <Message instructionMessage="This is the Sign In screen enter your start time below" />
        <Form.Item colon={false} label="Start Date" name="startDate">
          <DatePicker inputReadOnly format={dateFormat} allowClear={false} />
        </Form.Item>
        <Form.Item colon={false} label="Start Time" name="startTime">
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
          className="full-content"
          colon={false}
          label="Select Job *"
          name="job"
          rules={[{ required: true, message: "Please input your Job!" }]}
        >
          <Select mode="multiple" options={jobOptions} />
        </Form.Item>

        <Form.Item colon={false} className="flex justify-center mt-8 ">
          <Button label="Sign In" type="primary" htmlType="submit" />
        </Form.Item>
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.sigin-form {
  }
`;

SignInForm.propTypes = propTypes;
SignInForm.defaultProps = defaultProps;
export default SignInForm;
