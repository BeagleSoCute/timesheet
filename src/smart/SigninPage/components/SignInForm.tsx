import React, { useState } from "react";
import { jobOptions } from "data/options";
import { dateFormat, timeFormat } from "constants/format";
import styled from "styled-components";
import { DatePicker, Form, InputNumber, TimePicker, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import Button from "components/common/Button";
import Message from "components/common/Message";
import CustomRadioButton from "components/common/CustomRadioButton";
import { renderFieldTitle } from "helpers/form.helper";
import { preventSelectExcessTime } from "helpers/dateTime.helper";
import { signinFormProps } from "interface";
import { FormInstance } from "antd/lib/form";
import {
  formWithFullWidth,
  similarFormPropsForAllApp,
} from "helpers/form.helper";

interface SignInFormProps {
  onFinish: (data: signinFormProps) => void;
}

const SignInForm = ({ onFinish }: SignInFormProps) => {
  const [form] = Form.useForm() as [FormInstance<signinFormProps>];
  const [isForget, setIsForget] = useState(false);
  const handleOnFinish = (value: signinFormProps) => {
    const startTime: Dayjs = isForget
      ? form.getFieldValue("actualStartTime")
      : form.getFieldValue("startTime");
    onFinish({ ...value, startTime });
  };
  const handleChangeIsForget = (value: boolean) => {
    setIsForget(value);
  };

  const initialValues = {
    startDate: dayjs(),
    startTime: dayjs(),
    isForgetSingin: false,
  };
  const formItemProps = {
    ...similarFormPropsForAllApp,
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
          {...formItemProps}
          {...formWithFullWidth}
          className="full-content mb-0"
          label="Enter Pin *"
          name="pin"
          rules={[{ required: true, message: "Please input your pin!" }]}
        >
          <InputNumber className="w-full" controls={false} />
        </Form.Item>
        <Message instructionMessage="This is the Sign In screen enter your start time below" />
        <Form.Item {...formItemProps} label="Start Date" name="startDate">
          <DatePicker
            disabled={true}
            inputReadOnly
            format={dateFormat}
            allowClear={false}
          />
        </Form.Item>
        <Form.Item {...formItemProps} label="Start Time" name="startTime">
          <TimePicker
            disabled={true}
            showNow={false}
            inputReadOnly
            format={timeFormat}
            allowClear={false}
          />
        </Form.Item>
        <Form.Item
          {...formItemProps}
          label={renderFieldTitle(
            "Do you forget to sign in?",
            "If you forget to sign in, please select the acutal start time "
          )}
          name="isForgetSingin"
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
            className="select-actual-start-time"
            label="Actual Start time"
            name="actualStartTime"
            rules={[{ required: true, message: "Please select start time!" }]}
          >
            <TimePicker
              showNow={false}
              inputReadOnly
              format={timeFormat}
              allowClear={false}
              disabledTime={() =>
                preventSelectExcessTime(
                  form.getFieldValue("startDate"),
                  form.getFieldValue("finishDate"),
                  form.getFieldValue("startTime")
                )
              }
            />
          </Form.Item>
        )}
        <Form.Item
          {...formItemProps}
          {...formWithFullWidth}
          className="full-content"
          label="Select Job *"
          name="job"
          rules={[{ required: true, message: "Please input your Job!" }]}
        >
          <Select mode="multiple" options={jobOptions} />
        </Form.Item>

        <Form.Item {...formItemProps} className="flex justify-center mt-8 ">
          <Button label="Sign In" type="primary" htmlType="submit" />
        </Form.Item>
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.sigin-form {
    .select-actual-start-time.ant-form-item .ant-form-item-explain-error {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

export default SignInForm;
