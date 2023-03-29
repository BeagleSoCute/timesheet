import React, { useState } from "react";
import PropTypes from "prop-types";
import { dateFormat, timeFormat } from "constants/format";
import { Radio } from "antd";
import { DatePicker, Form, TimePicker, InputNumber } from "antd";
import dayjs from "dayjs";
import { notification } from "helpers/notification.helper";
import Message from "components/common/Message";
import styled from "styled-components";
import Button from "components/common/Button";

const propTypes = {
  data: PropTypes.object,
  onOpenModal: PropTypes.func,
};
const defaultProps = {
  data: {},
  onOpenModal: () => {},
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
};

const TimesheetForm = ({ data, onOpenModal }) => {
  const [form] = Form.useForm();
  const [isBreak, setIsBreak] = useState(true);
  const [isStartTimeCorrect, setIsStartTimeCorrect] = useState(true);

  const handleOnFinish = (value) => {
    const result = {
      ...value,
      startDate: dayjs(value.startDate).format(dateFormat),
      startTime: dayjs(value.startTime).format(timeFormat),
      finishDate: dayjs(value.finishDate).format(dateFormat),
      finishTime: dayjs(value.finishTime).format(timeFormat),
      breaksTime: isBreak ? dayjs(value.breaksTime).format("mm") : "00",
    };
    onOpenModal(result);
  };
  const initialValues = {
    startDate: data.startDate,
    finishDate: data.startDate,
    startTime: data.startTime,
    timeFormat,
    isStartTimeCorrect: true,
    isTakenBreak: true,
  };
  const handleDisabledEndDate = (current) => {
    const startDate = form.getFieldValue("startDate");
    return current && current.isBefore(dayjs(startDate).endOf("day"), "day");
  };
  const handleDisabledStartDate = (current) => {
    const finishDate = form.getFieldValue("finishDate");
    return current && current.isAfter(dayjs(finishDate).endOf("day"), "day");
  };

  return (
    <StyledDiv className="timesheet-form">
      <Form
        form={form}
        name="basic"
        {...formItemLayout}
        initialValues={initialValues}
        onFinish={handleOnFinish}
      >
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Enter Pin"
          name="pin"
          rules={[{ required: true, message: "Please input your pin!" }]}
        >
          <InputNumber className="w-full" controls={false} />
        </Form.Item>
        <Message instructionMessage="This is your SIGN OUT screen, enter finish time below" />
        <Form.Item label="Is the Start time correct" name="isStartTimeCorrect">
          <Radio.Group
            className="is-time-correct"
            onChange={(e) => setIsStartTimeCorrect(e.target.value)}
            size="large"
          >
            <Radio.Button className="mx-2" value={true}>
              Yes
            </Radio.Button>
            <Radio.Button value={false}>No</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Start Date" name="startDate">
          <DatePicker
            disabledDate={handleDisabledStartDate}
            disabled={isStartTimeCorrect}
            allowClear={false}
            inputReadOnly
            format={dateFormat}
          />
        </Form.Item>
        <Form.Item label="Start Time" name="startTime">
          <TimePicker
            disabled={isStartTimeCorrect}
            // disabledHours={disabledStartTime}
            allowClear={false}
            showNow={false}
            inputReadOnly
            format={timeFormat}
          />
        </Form.Item>
        <Form.Item label="Finish Date" name="finishDate">
          <DatePicker
            disabledDate={handleDisabledEndDate}
            allowClear={false}
            inputReadOnly
            format={dateFormat}
          />
        </Form.Item>

        <Form.Item
          label="Finish Time"
          name="finishTime"
          rules={[
            { required: true, message: "Please input your finish time!" },
          ]}
        >
          <TimePicker
            // disabledHours={disabledFinishTime}
            allowClear={false}
            showNow={false}
            inputReadOnly
            format={timeFormat}
          />
        </Form.Item>
        <Form.Item label="Have you taken a break" name="isTakenBreak">
          <Radio.Group
            className="is-taken-break"
            onChange={(e) => setIsBreak(e.target.value)}
            size="large"
          >
            <Radio.Button className="mx-2" value={true}>
              Yes
            </Radio.Button>
            <Radio.Button value={false}>No</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Total miniutes of breaks taken this day? Include paid and unpaid breaks"
          name="breaksTime"
          rules={[
            isBreak && {
              required: true,
              message: "Please input your total minutes of breaks!",
            },
          ]}
        >
          <TimePicker
            className="w-full"
            disabled={!isBreak}
            allowClear={false}
            showNow={false}
            inputReadOnly
            format={"mm"}
          />
        </Form.Item>

        <Form.Item className=" flex justify-center mt-8 ">
          <Button
            type="primary"
            label="Allocate..."
            isPrimary={false}
            htmlType="submit"
          />
        </Form.Item>
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.timesheet-form {
    .ant-radio-button-wrapper {
      span {
        color: white;
        font-weight: bold;
      }
    }
    .is-time-correct
      .ant-radio-button-wrapper.ant-radio-button-wrapper-checked.ant-radio-button-wrapper-in-form-item {
      background-color: #48ff00;
      border-color: #48ff00;
    }

    .is-taken-break
      .ant-radio-button-wrapper.ant-radio-button-wrapper-checked.ant-radio-button-wrapper-in-form-item {
      background-color: #e9c250;
      border-color: #e9c250;
    }

    .ant-radio-button-wrapper.ant-radio-button-wrapper-in-form-item {
      background-color: #cccccc;
      border-color: #cccccc;
    }
    .ant-radio-button-wrapper:first-child {
      border-start-start-radius: 0px;
      border-end-start-radius: 0px;
    }
    .ant-radio-button-wrapper:last-child {
      border-start-end-radius: 0px;
      border-end-end-radius: 0px;
    }

    label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked.ant-radio-button-wrapper-in-form-item::before {
      background-color: none !important;
    }
  }
`;

TimesheetForm.propTypes = propTypes;
TimesheetForm.defaultProps = defaultProps;
export default TimesheetForm;
