import React, { useState } from "react";
import { dateFormat, timeFormat } from "constants/format";
import { Radio } from "antd";
import { DatePicker, Form, TimePicker, InputNumber } from "antd";
import Message from "components/common/Message";
import styled from "styled-components";
import Button from "components/common/Button";
import { renderFieldTitle } from "helpers/form.helper";
import { mergeDateAndTime } from "helpers/dateTime.helper";
import { Dayjs } from "dayjs";

const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

interface propsType {
  form: any;
  pin: number;
  startDateTime: object;
  finishDate: object;
  finishTime: object;
  onSubmit: (data: any) => void;
}

const TimesheetForm = ({
  form,
  pin,
  startDateTime,
  finishDate,
  finishTime,
  onSubmit,
}: propsType) => {
  const [isBreak, setIsBreak] = useState(true);
  const handleChangeIsBreak = (value: boolean) => {
    setIsBreak(value);
    form.resetFields(["breaksTime"]);
  };
  const handleOnFinish = (value: any) => {
    const result = {
      ...value,
      finishDateTime: mergeDateAndTime(finishDate, finishTime),
      breaksTime: isBreak ? value.breaksTime : 0,
    };
    onSubmit(result);
  };
  const initialValues = {
    pin,
    startDateTime,
    finishDate,
    finishTime,
    timeFormat,
    isTakenBreak: true,
  };

  return (
    <StyledDiv className="timesheet-form">
      <Form
        form={form}
        {...formItemLayout}
        name="basic"
        requiredMark={false}
        initialValues={initialValues}
        onFinish={handleOnFinish}
      >
        <Form.Item
          className="full-content mb-0"
          colon={false}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Enter Pin *"
          name="pin"
          rules={[{ required: true, message: "Please input your pin!" }]}
        >
          <InputNumber className="w-full" controls={false} />
        </Form.Item>
        <Message instructionMessage="This is your SIGN OUT screen, enter finish time below" />

        <Form.Item
          colon={false}
          label={renderFieldTitle(
            "Actual Start Date / Time",
            "If you want to change your start time, you need to resubmit your timesheet. Enter No and resubmit"
          )}
          name="startDateTime"
        >
          <DatePicker
            showTime
            disabled={true}
            onChange={() => {
              form.resetFields(["finishTime"]);
            }}
            allowClear={false}
            format="DD/MM/YYYY HH:mm"
          />
        </Form.Item>
        <Form.Item
          colon={false}
          label={renderFieldTitle(
            "Finish Date",
            "You can not back date this date, if you have forgotten your timesheet you must contact your manager"
          )}
          name="finishDate"
        >
          <DatePicker
            disabled={true}
            allowClear={false}
            onChange={() => form.resetFields(["finishTime"])}
            inputReadOnly
            format={dateFormat}
          />
        </Form.Item>

        <Form.Item
          className="fit-error"
          colon={false}
          label="Finish Time *"
          name="finishTime"
          rules={[{ required: true, message: "Please input finish time!" }]}
        >
          <TimePicker
            disabled={true}
            allowClear={false}
            showNow={false}
            inputReadOnly
            format={timeFormat}
          />
        </Form.Item>
        <Form.Item
          colon={false}
          label="Have you taken a break?"
          name="isTakenBreak"
        >
          <Radio.Group
            className="is-taken-break"
            onChange={(e) => handleChangeIsBreak(e.target.value)}
            size="large"
          >
            <Radio.Button className="mx-2" value={true}>
              Yes
            </Radio.Button>
            <Radio.Button value={false}>No</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          className="full-content"
          colon={false}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label={renderFieldTitle(
            "Total miniutes of breaks taken this day? Include paid and unpaid breaks",
            "No break time is included in your allocations, but your paid break will be added back in at sign off stage for payroll."
          )}
          name="breaksTime"
          rules={
            isBreak
              ? [
                  {
                    required: true,
                    message: "Please input total minutes of breaks!",
                  },
                ]
              : []
          }
        >
          <InputNumber
            className="w-full mt-2"
            disabled={!isBreak}
            controls={false}
          />
        </Form.Item>
        <Form.Item colon={false} className="flex justify-center mt-8 ">
          <Button
            className="mb-10 bg-blue-800 text-white font-bold "
            label="Allocate..."
            htmlType="submit"
          />
        </Form.Item>
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.timesheet-form {
    label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked.ant-radio-button-wrapper-in-form-item::before {
      background-color: transparent !important;
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
export default TimesheetForm;
