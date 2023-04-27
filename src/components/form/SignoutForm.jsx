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
  finishDateTime: PropTypes.object,
  onFinish: PropTypes.func,
};
const defaultProps = {
  onFinish: () => {},
};

const SignoutForm = ({ data, onFinish }) => {
  const [form] = Form.useForm();

  const handleOnFinish = (value) => {
    onFinish(value);
  };
  const initialValues = {
    pin: data.pin,
    startDateTime: data.startDateTime,
    finishDate: dayjs(),
    finishTime: dayjs(),
  };
  return (
    <StyledDiv className="sigout-form">
      <Form
        form={form}
        name="basic"
        requiredMark={false}
        initialValues={initialValues}
        onFinish={handleOnFinish}
        autoComplete="off"
      >
        <Form.Item
          className="full-content mb-0"
          colon={false}
          label="Enter Pin *"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="pin"
          rules={[{ required: true, message: "Please input your pin!" }]}
        >
          <InputNumber className="w-full" controls={false} />
        </Form.Item>
        <Message instructionMessage="This is the Sign out screen enter your start time below" />
        <Form.Item
          colon={false}
          //   label={renderFieldTitle(
          //     "Actual Start Date / Time",
          //     "If you want to change your start time, you need to resubmit your timesheet. Enter No and resubmit"
          //   )}
          name="startDateTime"
        >
          <DatePicker
            showTime
            disabledDate={handleDisabledStartDate}
            disabled={isStartTimeCorrect}
            allowClear={false}
            format="DD/MM/YYYY HH:mm"
          />
        </Form.Item>

        <Form.Item colon={false} label="Finish Date" name="finishDate">
          <DatePicker
            disabled={true}
            inputReadOnly
            format={dateFormat}
            allowClear={false}
          />
        </Form.Item>
        <Form.Item colon={false} label="Finish Time" name="finishTime">
          <TimePicker
            disabled={true}
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
          <Button label="Sign Out" type="primary" htmlType="submit" />
        </Form.Item>
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.sigout-form {
  }
`;

SignoutForm.propTypes = propTypes;
SignoutForm.defaultProps = defaultProps;
export default SignoutForm;
