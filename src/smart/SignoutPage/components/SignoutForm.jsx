import React, { useState } from "react";
import PropTypes from "prop-types";
import { jobOptions } from "data/options";
import { dateFormat, timeFormat } from "constants/format";
import { dateTimeFormat } from "constants/format";
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
import dayjs from "dayjs";
import Button from "components/common/Button";
import Message from "components/common/Message";
import CustomRadioButton from "components/common/CustomRadioButton";
import { renderFieldTitle } from "helpers/form.helper";
import { preventActualTime } from "helpers/dateTime.helper";

const propTypes = {
  startDateTime: PropTypes.object,
  pin: PropTypes.number,
  job: PropTypes.array,
  onFinish: PropTypes.func,
};
const defaultProps = {
  onFinish: () => {},
};

const SignoutForm = ({ startDateTime, pin, onFinish, job }) => {
  const [form] = Form.useForm();
  const [isClockout, setIsClockout] = useState(false);
  const [isForget, setIsForget] = useState(false);
  const handleChangeIsForget = (value) => {
    setIsForget(value);
  };
  const handleOnFinish = () => {
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
  };
  const handleClockout = () => {
    setIsClockout(true);
    form.setFieldsValue({ finishDate: dayjs(), finishTime: dayjs() });
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
              colon={false}
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
                className="select-actual-finish-time"
                colon={false}
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
          {isClockout ? (
            <Row>
              <Button label="Sign Out" htmlType="submit" type="primary" />
              <Button
                type="secondary"
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

SignoutForm.propTypes = propTypes;
SignoutForm.defaultProps = defaultProps;
export default SignoutForm;