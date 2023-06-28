import React, { useState, useEffect } from "react";
import { dateFormat, timeFormat } from "constants/format";
import { Radio } from "antd";
import { DatePicker, Form, TimePicker, InputNumber } from "antd";
import Message from "components/common/Message";
import styled from "styled-components";
import Button from "components/common/Button";
import { preventActualTime } from "helpers/dateTime.helper";
import {
  formWithFullWidth,
  renderFieldTitle,
  similarFormPropsForAllApp,
} from "helpers/form.helper";
import { mergeDateAndTime } from "helpers/dateTime.helper";
import dayjs, { Dayjs } from "dayjs";
import {
  calculateRemainingHoursPropsType,
  timesheetPageFormType,
  signoutDataType,
} from "interface";
import { FormInstance } from "antd/lib/form";
import CustomRadioButton from "components/common/CustomRadioButton";

const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

interface propsType {
  form: FormInstance<timesheetPageFormType>;
  signoutData: signoutDataType | null;
  startDateTime: Dayjs;
  onSubmit: (data: calculateRemainingHoursPropsType) => void;
  signoutTime: Dayjs | null;
}

const TimesheetForm = ({
  form,
  signoutTime,
  startDateTime,
  signoutData,
  onSubmit,
}: propsType) => {
  const [isBreak, setIsBreak] = useState(
    signoutData ? signoutData.isTakenBreak : true
  );
  const [isForget, setIsForget] = useState<boolean>(
    signoutData ? signoutData.isForgetSingout : false
  );

  const handleChangeIsForget = (value: boolean): void => {
    setIsForget(value);
  };

  const handleChangeIsBreak = (value: boolean) => {
    console.log("valueee", value);
    setIsBreak(value);
    form.resetFields(["breaksTime"]);
  };

  const initialValues = {
    startDateTime: startDateTime,
    finishDate: signoutData ? signoutData.finishDateTime : dayjs(),
    finishTime: signoutTime ? signoutTime : dayjs(),
    actualFinishTime: signoutData ? signoutData.finishDateTime : undefined,
    isTakenBreak: signoutData ? signoutData.isTakenBreak : true,
    isForgetSingout: signoutData ? signoutData.isForgetSingout : false,
    breaksTime: signoutData ? signoutData.breaksTime : 0,
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues.startDateTime]);

  const handleOnFinish = (value: timesheetPageFormType) => {
    const finishDate = form.getFieldValue("finishDate");
    const finishTime = form.getFieldValue("finishDate");
    const actualFinishTime = isForget
      ? form.getFieldValue("actualFinishTime")
      : form.getFieldValue("finishTime");

    const result = {
      startDateTime: value.startDateTime,
      finishDateTime: mergeDateAndTime(finishDate, actualFinishTime),
      breaksTime: isBreak ? value.breaksTime : 0,
      signoutTime,
      isForgetSingout: value.isForgetSingout,
      isTakenBreak: value.isTakenBreak,
    };
    onSubmit(result);
  };

  const formItemProps = {
    ...similarFormPropsForAllApp,
  };
  return (
    <StyledDiv className="timesheet-form">
      <Form
        {...formItemLayout}
        form={form}
        name="basic"
        requiredMark={false}
        // initialValues={initialValues}
        onFinish={handleOnFinish}
      >
        <Message instructionMessage="This is your SIGN OUT screen, enter finish time below" />
        <Form.Item
          {...formItemProps}
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
          {...formItemProps}
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
          {...formItemProps}
          className="fit-error"
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
            disabledTime={() =>
              preventActualTime(
                form.getFieldValue("finishDate"),
                form.getFieldValue("finishTime"),
                form.getFieldValue("startDateTime")
              )
            }
          />
        </Form.Item>
        <Form.Item
          {...formItemProps}
          label={renderFieldTitle(
            "Do you forget to sign out?",
            "If you forget to sign out, please select the acutal end time "
          )}
          name="isForgetSingout"
        >
          <CustomRadioButton
            defaultValue={false}
            color="yellow"
            onChange={handleChangeIsForget}
          />
        </Form.Item>
        {isForget && (
          <Form.Item
            {...formItemProps}
            className="select-actual-finish-time"
            label="Actual Finish time"
            name="actualFinishTime"
            rules={[{ required: true, message: "Please select finish time!" }]}
          >
            <TimePicker
              showNow={false}
              inputReadOnly
              format={timeFormat}
              allowClear={false}
              disabledTime={() =>
                preventActualTime(
                  form.getFieldValue("finishDate"),
                  form.getFieldValue("finishTime"),
                  form.getFieldValue("startDateTime")
                )
              }
            />
          </Form.Item>
        )}

        <Form.Item
          {...formItemProps}
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
          {...formItemProps}
          className="full-content"
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
        <Form.Item {...formItemProps} className="flex justify-center mt-8 ">
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
