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
import { renderFieldTitle } from "helpers/form.helper";

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
          colon={false}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Enter Pin"
          name="pin"
          rules={[{ required: true, message: "Please input your pin!" }]}
        >
          <InputNumber className="w-full" controls={false} />
        </Form.Item>
        <Message instructionMessage="This is your SIGN OUT screen, enter finish time below" />
        <Form.Item
          colon={false}
          label={renderFieldTitle(
            "Is the Start time correct",
            "You can only change the time not the date of this field"
          )}
          name="isStartTimeCorrect"
        >
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

        <Form.Item
          colon={false}
          label={renderFieldTitle(
            "Actual Start Date / Time",
            "If you want to change your start tie, you need to resubmi your timesheet. Enter No and resubmit"
          )}
          name="startDate"
        >
          <DatePicker
            disabledDate={handleDisabledStartDate}
            disabled={isStartTimeCorrect}
            allowClear={false}
            inputReadOnly
            format={dateFormat}
          />
        </Form.Item>
        <Form.Item colon={false} label="Start Time" name="startTime">
          <TimePicker
            disabled={isStartTimeCorrect}
            // disabledHours={disabledStartTime}
            allowClear={false}
            showNow={false}
            inputReadOnly
            format={timeFormat}
          />
        </Form.Item>
        <Form.Item
          colon={false}
          label={renderFieldTitle(
            "Finish Date",
            "You can not back date this date, if you have forgotten your timesheet ypu must contact your manager"
          )}
          name="finishDate"
        >
          <DatePicker
            disabledDate={handleDisabledEndDate}
            allowClear={false}
            inputReadOnly
            format={dateFormat}
          />
        </Form.Item>

        <Form.Item
          colon={false}
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
        <Form.Item
          colon={false}
          label="Have you taken a break"
          name="isTakenBreak"
        >
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
          colon={false}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label={renderFieldTitle(
            "Total miniutes of breaks taken this day? Include paid and unpaid breaks",
            "No break time is included in your allocations, but your paid break will be added back in at sign off stage for payroll."
          )}
          name="breaksTime"
          rules={[
            isBreak && {
              required: true,
              message: "Please input your total minutes of breaks!",
            },
          ]}
        >
          <TimePicker
            className="w-full mt-2"
            disabled={!isBreak}
            allowClear={false}
            showNow={false}
            inputReadOnly
            format={"mm"}
          />
        </Form.Item>

        <Form.Item colon={false} className=" flex justify-center mt-8 ">
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
    .field-title {
      span.description {
        display: block;
      }
    }
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
