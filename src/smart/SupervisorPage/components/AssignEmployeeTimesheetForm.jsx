import React, { useState } from "react";
import { Form, DatePicker, InputNumber, Modal } from "antd";
import styled from "styled-components";
import { renderFieldTitle } from "helpers/form.helper";
import dayjs from "dayjs";
import CustomRadioButton from "components/common/CustomRadioButton";
import Button from "components/common/Button";
import {
  preventSelectExcessTime,
  preventSelectFinishTime,
} from "helpers/dateTime.helper";
import { notification } from "helpers/notification.helper";

const AssignEmployeeTimesheetForm = ({
  isShowTimesheetForm,
  isCompleteAllocation,
  onFinish,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [isBreak, setIsBreak] = useState(true);

  const handleOnFinish = (value) => {
    const finishDateTime = form.getFieldValue("finishDateTime");
    const startDateTime = form.getFieldValue("startDateTime");
    const isFinishAfterStart = finishDateTime.isAfter(startDateTime);
    if (!isFinishAfterStart) {
      notification({
        type: "error",
        message:
          "You can not select a finish time that occurs before the start time. Please try again",
      });
      return;
    }
    const transformValue = {
      ...value,
      breaksTime: isBreak ? value.breaksTime : 0,
    };
    onFinish(transformValue);
  };
  const handleDisabledStartDate = (current) => {
    const finishDate = form.getFieldValue("finishDateTime");
    if (finishDate) {
      return current && current.isAfter(dayjs(finishDate).endOf("day"), "day");
    }
  };
  const handleDisabledEndDate = (current) => {
    const startDateTime = form.getFieldValue("startDateTime");
    if (startDateTime) {
      return (
        current && current.isBefore(dayjs(startDateTime).endOf("day"), "day")
      );
    }
  };
  const handleDisableStartTime = () => {
    const finishDate = form.getFieldValue("finishDateTime");
    if (finishDate) {
      return preventSelectExcessTime(
        form.getFieldValue("startDateTime"),
        form.getFieldValue("finishDateTime"),
        form.getFieldValue("finishDateTime")
      );
    }
  };
  const handleDisableFinishTime = () => {
    const startDateTime = form.getFieldValue("startDateTime");
    if (startDateTime) {
      return preventSelectFinishTime(
        form.getFieldValue("startDateTime"),
        form.getFieldValue("finishDateTime"),
        form.getFieldValue("startDateTime")
      );
    }
  };
  const handleChangeIsBreak = (value) => {
    setIsBreak(value);
    form.resetFields(["breaksTime"]);
  };
  const handleCancel = () => {
    Modal.confirm({
      content: (
        <p className="text-xl">
          Do you want to cancel your task? All of the timesheet allocation data
          will be removed.
        </p>
      ),
      centered: true,
      closable: false,
      maskClosable: false,
      cancelText: "Cancel",
      onOk: () => onCancel(),
    });
  };
  return (
    <StyledDiv className="assign-employee-timesheet-form ">
      <Form
        form={form}
        name="basic"
        requiredMark={false}
        // initialValues={initialValues}
        onFinish={handleOnFinish}
        autoComplete="off"
      >
        <Form.Item
          className="right-input"
          colon={false}
          label="Start Date / Time"
          name="startDateTime"
          rules={[
            { required: true, message: "Please select start date and time!" },
          ]}
        >
          <DatePicker
            showTime
            disabled={isShowTimesheetForm || isCompleteAllocation}
            disabledDate={handleDisabledStartDate}
            allowClear={false}
            format="DD/MM/YYYY HH:mm"
            disabledTime={() => handleDisableStartTime()}
          />
        </Form.Item>
        <Form.Item
          className="right-input"
          colon={false}
          label="Finish Date / Time"
          name="finishDateTime"
          rules={[
            { required: true, message: "Please select finish date and time!" },
          ]}
        >
          <DatePicker
            showTime
            disabled={isShowTimesheetForm || isCompleteAllocation}
            disabledDate={handleDisabledEndDate}
            disabledTime={() => handleDisableFinishTime()}
            onChange={() => {}}
            allowClear={false}
            format="DD/MM/YYYY HH:mm"
          />
        </Form.Item>
        <Form.Item
          colon={false}
          label="Have your employee taken a break?"
          name="isTakenBreak"
        >
          <CustomRadioButton
            defaultValue={true}
            disabled={isShowTimesheetForm || isCompleteAllocation}
            color="yellow"
            onChange={handleChangeIsBreak}
          />
        </Form.Item>
        <Form.Item
          className="full-content"
          colon={false}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label={renderFieldTitle(
            "Total miniutes of breaks that your employee taken this day? Include paid and unpaid breaks",
            "No break time is included in their allocations, but their paid break will be added back in at sign off stage for payroll."
          )}
          name="breaksTime"
          rules={[
            isBreak && {
              required: true,
              message: "Please input total minutes of breaks!",
            },
          ]}
        >
          <InputNumber
            className="w-full mt-2"
            disabled={!isBreak || isShowTimesheetForm || isCompleteAllocation}
            controls={false}
          />
        </Form.Item>
        {!isShowTimesheetForm && !isCompleteAllocation && (
          <Form.Item colon={false} className="flex justify-center mt-8 ">
            <Button
              className="mb-10 bg-blue-800 text-white font-bold "
              label="Confirm"
              htmlType="submit"
            />
          </Form.Item>
        )}
        {isShowTimesheetForm && !isCompleteAllocation && (
          <div className="flex justify-center ">
            <Button
              className="mb-10 bg-blue-800 text-white font-bold"
              label="Cancel"
              onClick={() => handleCancel()}
            />
          </div>
        )}
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.assign-employee-timesheet-form {
    .right-input.ant-form-item .ant-form-item-explain-error {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

export default AssignEmployeeTimesheetForm;
