import React from "react";
import PropTypes from "prop-types";
import { jobOptions } from "data/options";
import { dateFormat, timeFormat } from "constants/format";
import { Radio } from "antd";
import {
  Button,
  DatePicker,
  Form,
  Input,
  TimePicker,
  Alert,
  InputNumber,
} from "antd";
import dayjs from "dayjs";

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

const TimesheetForm = ({ data, onOpenModal }) => {
  console.log("data", data);
  const [form] = Form.useForm();
  const handleOnFinish = (value) => {
    const result = {
      ...value,
      startDate: dayjs(value.startDate).format(dateFormat),
      startTime: dayjs(value.startDate).format(timeFormat),
    };
    onOpenModal(result);
  };
  const initialValues = {
    startDate: dayjs(data.startDate, dateFormat),
    finishDate: dayjs(data.startDate, dateFormat),
    startTime: dayjs(data.startTime, timeFormat),
    isStartTimeCorrect: true,
    isTakenBreak: true,
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

        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[{ required: true, message: "Please input your start date!" }]}
        >
          <DatePicker allowClear={false} inputReadOnly format={dateFormat} />
        </Form.Item>
        <Form.Item
          label="Start Time"
          name="startTime"
          rules={[{ required: true, message: "Please input your start time!" }]}
        >
          <TimePicker
            allowClear={false}
            showNow={false}
            inputReadOnly
            format={timeFormat}
          />
        </Form.Item>
        <Form.Item
          label="Finish Date"
          name="finishDate"
          rules={[{ required: true, message: "Please input your start date!" }]}
        >
          <DatePicker allowClear={false} inputReadOnly format={dateFormat} />
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
