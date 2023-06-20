import React, { useState } from "react";
import { dateFormat, timeFormat, dateTimeFormat } from "constants/format";
import styled from "styled-components";
import {
  DatePicker,
  Form,
  InputNumber,
  TimePicker,
  Select,
  Row,
  Modal,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import Button from "components/common/Button";
import Message from "components/common/Message";
import CustomRadioButton from "components/common/CustomRadioButton";
import { renderFieldTitle } from "helpers/form.helper";
import { preventActualTime } from "helpers/dateTime.helper";
import { signoutFormProps, jobType } from "interface";
import { FormInstance } from "antd/lib/form";
import {
  formWithFullWidth,
  similarFormPropsForAllApp,
} from "helpers/form.helper";
import { jobOptions, handleFilter } from "helpers/select.helper";

interface ComponentProps {
  startDateTime: Dayjs;
  pin: number;
  onFinish: (data: signoutFormProps) => void;
  job: string[];
  jobLists: jobType[];
}
const SignoutForm: React.FC<ComponentProps> = ({
  startDateTime,
  pin,
  jobLists,
  onFinish,
  job,
}) => {
  const [form] = Form.useForm() as [FormInstance<signoutFormProps>];
  const [isClockout, setIsClockout] = useState<boolean>(false);
  const [isForget, setIsForget] = useState<boolean>(false);
  const handleChangeIsForget = (value: boolean): void => {
    setIsForget(value);
  };
  const handleOnFinish = (): void => {
    const transformData = {
      ...form.getFieldsValue(),
      finishTime: isForget
        ? form.getFieldValue("actualFinishTime")
        : form.getFieldValue("finishTime"),
    };
    Modal.confirm({
      content: (
        <p className="text-xl">
          Are you sure to signout? Plese makesure your end date and time are
          correct
        </p>
      ),
      centered: true,
      closable: false,
      maskClosable: true,
      onOk: () => onFinish(transformData),
    });
  };
  const initialValues = {
    pin,
    startDateTime,
    job,
    isForgetSingout: false,
  };
  const handleClockout = (): void => {
    setIsClockout(true);
    form.setFieldsValue({ finishDate: dayjs(), finishTime: dayjs() });
  };

  const formItemProps = {
    ...similarFormPropsForAllApp,
  };
  return (
    <StyledDiv className="sigout-form">
      <Form
        form={form}
        name="basic"
        requiredMark={false}
        initialValues={initialValues}
        autoComplete="off"
        onFinish={handleOnFinish}
      >
        <Form.Item
          {...formItemProps}
          className="full-content mb-0"
          label="Enter Pin *"
          {...formWithFullWidth}
          name="pin"
          rules={[{ required: true, message: "Please input your pin!" }]}
        >
          <InputNumber className="w-full" controls={false} />
        </Form.Item>
        <Message instructionMessage="This is the Sign out screen enter your start time below" />
        <Form.Item
          {...formItemProps}
          label=" Start Date / Time"
          name="startDateTime"
        >
          <DatePicker
            disabled={true}
            showTime
            allowClear={false}
            format={dateTimeFormat}
          />
        </Form.Item>
        {isClockout && (
          <>
            <Form.Item {...formItemProps} label="Finish Date" name="finishDate">
              <DatePicker
                disabled={true}
                inputReadOnly
                format={dateFormat}
                allowClear={false}
              />
            </Form.Item>
            <Form.Item {...formItemProps} label="Finish Time" name="finishTime">
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
                rules={[
                  { required: true, message: "Please select finish time!" },
                ]}
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
          </>
        )}
        <Form.Item
          {...formItemProps}
          {...formWithFullWidth}
          className="full-content"
          label="Select Job *"
          name="job"
          rules={[{ required: true, message: "Please input your Job!" }]}
        >
          <Select mode="multiple" options={jobOptions(jobLists)} />
        </Form.Item>
        <Form.Item {...formItemProps} className="flex justify-center mt-8 ">
          {isClockout ? (
            <Row>
              <Button label="Sign Out" htmlType="submit" type="primary" />
              <Button
                label="Cancel Clock out"
                className="w-full mx-5"
                onClick={() => setIsClockout(false)}
              />
            </Row>
          ) : (
            <Button
              label="Clock out"
              type="primary"
              onClick={() => handleClockout()}
            />
          )}
        </Form.Item>
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.sigout-form {
    .select-actual-finish-time.ant-form-item .ant-form-item-explain-error {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

export default SignoutForm;
