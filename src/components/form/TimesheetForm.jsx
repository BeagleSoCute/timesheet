import React from "react";
import PropTypes from "prop-types";
import { dateFormat, timeFormat } from "constants/format";
import { Radio } from "antd";
import { Button, DatePicker, Form, TimePicker, Alert, InputNumber } from "antd";
import dayjs from "dayjs";
import { notification } from "helpers/notification.helper";

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
  const handleOnFinish = (value) => {
    const result = {
      ...value,
      startDate: dayjs(value.startDate).format(dateFormat),
      startTime: dayjs(value.startTime).format(timeFormat),
      finishDate: dayjs(value.finishDate).format(dateFormat),
      finishTime: dayjs(value.finishTime).format(timeFormat),
      breaksTime: dayjs(value.breaksTime).format("mm"),
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
    <div className="timesheet-form">
      <h1 className="text-center mb-5">Time Sheet</h1>
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

        <Form.Item label="Is the Start time correct" name="isStartTimeCorrect">
          <Radio.Group size="large">
            <Radio.Button value={true}>Yes </Radio.Button>
            <Radio.Button value={false}>No</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Start Date" name="startDate">
          <DatePicker
            disabledDate={handleDisabledStartDate}
            allowClear={false}
            inputReadOnly
            format={dateFormat}
          />
        </Form.Item>
        <Form.Item label="Start Time" name="startTime">
          <TimePicker
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
            allowClear={false}
            showNow={false}
            inputReadOnly
            format={timeFormat}
          />
        </Form.Item>
        <Form.Item label="Have you taken a break" name="isTakenBreak">
          <Radio.Group size="large">
            <Radio.Button value={true}>Yes </Radio.Button>
            <Radio.Button value={false}>No</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Total miniutes of breaks taken this day? Include paid and unpaid breaks"
          name="breaksTime"
          rules={[
            {
              required: true,
              message: "Please input your total minutes of breaks!",
            },
          ]}
        >
          <TimePicker
            allowClear={false}
            showNow={false}
            inputReadOnly
            format={"mm"}
          />
        </Form.Item>

        <Form.Item className="button-submit-layout flex justify-center mt-8 ">
          <Button className="button-submit  " type="primary" htmlType="submit">
            Allocate
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

TimesheetForm.propTypes = propTypes;
TimesheetForm.defaultProps = defaultProps;
export default TimesheetForm;
