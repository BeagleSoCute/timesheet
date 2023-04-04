import React, { useEffect } from "react";
import { Form, TimePicker, Select, Input } from "antd";
import { jobOptions, supervisorOptions, labOptions } from "data/options";
import { convertToOrdinalNumber } from "helpers/common.helper";
import { timeFormat } from "constants/format";
import dayjs from "dayjs";
import { calRemainFromLabourHour } from "services/timesheet.service";
import PropTypes from "prop-types";
import { notification } from "helpers/notification.helper";
import DefaultButton from "components/common/Button";
import styled from "styled-components";

const propTypes = {
  remainingHours: PropTypes.string,
  onSetRemaingHour: PropTypes.func,
  onSubmit: PropTypes.func,
};
const defaultProps = {
  remainingHours: "",
  onSetRemaingHour: () => {},
  onSubmit: () => {},
};

const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

const TimesheetAllocation = ({
  remainingHours,
  onSetRemaingHour,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    const init = () => {
      form.setFieldsValue({
        items: [{}],
      });
    };
    init();
  }, [form]);
  const handleOnFinish = (value) => {
    const { items } = value;
    onSubmit(items);
  };
  const handleCalculateRemainHours = async (value, index) => {
    console.log("value is ", value);
    const items = form.getFieldsValue("items")["items"];
    let thisFormItem = form.getFieldsValue("items")["items"][index];
    const previousLabourHour = thisFormItem.previousLabourHour;
    const modifyPreviousLabourHourD = previousLabourHour
      ? dayjs(previousLabourHour).format(timeFormat)
      : undefined;
    const labourHours = dayjs(value).format(timeFormat);
    const result = await calRemainFromLabourHour(
      remainingHours,
      labourHours,
      modifyPreviousLabourHourD
    );
    if (!result.isSuccess) {
      thisFormItem = {
        ...thisFormItem,
        labourHours: previousLabourHour,
      };
      items.splice(index, 1, thisFormItem);
      form.setFieldsValue({ items });
      notification({
        type: "error",
        message:
          "Labour hour can not excess the remaining hour, Please try again",
      });
      return;
    }
    thisFormItem = {
      ...thisFormItem,
      previousLabourHour: value,
    };
    items.splice(index, 1, thisFormItem);
    form.setFieldsValue({ items });
    onSetRemaingHour(result.value);
  };
  const handleRemove = async (fieldName, index, remmove) => {
    const currentLabourHours =
      form.getFieldsValue("items")["items"][index].labourHours;
    if (!currentLabourHours) {
      remmove(fieldName);
      return;
    }
    const labourHours = dayjs(currentLabourHours).format(timeFormat);
    const isReset = true;
    const result = await calRemainFromLabourHour(
      remainingHours,
      labourHours,
      undefined,
      isReset
    );
    onSetRemaingHour(result.value);
    remmove(fieldName);
  };
  return (
    <StyledDiv className="timesheet-allocation-form">
      <Form
        {...formItemLayout}
        requiredMark={false}
        id="timesheet-allo"
        form={form}
        name="timesheet-allocation-form"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={handleOnFinish}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <div className="form-item" key={field.key}>
                    <div className="bg-blue-900  px-4 text-white flex justify-between ">
                      <h1 className="text-2xl my-3	">
                        {convertToOrdinalNumber(index)} ALLOCATION
                      </h1>
                      {fields.length > 1 && (
                        <Form.Item className="my-auto text-red-600 font-bold px-1">
                          <DefaultButton
                            className=" w-full h-full "
                            label="Remove
                            "
                            onClick={() =>
                              handleRemove(field.name, index, remove)
                            }
                          />
                        </Form.Item>
                      )}
                    </div>
                    <div>
                      <div className="remain-hour grid grid-cols-12 mt-1 lable-bg-color">
                        <span className="font-bold col-span-8 my-auto ">
                          Remaining Hours to Allocate:
                        </span>
                        <Input
                          className="col-span-4 text-right"
                          readOnly
                          value={remainingHours}
                        />
                      </div>
                      <Form.Item
                        className="full-content mb-0 "
                        colon={false}
                        label="Job *"
                        name={[index, "job"]}
                        rules={[
                          {
                            required: true,
                            message: "Please select your job!",
                          },
                        ]}
                      >
                        <Select options={jobOptions} />
                      </Form.Item>
                      <Form.Item
                        className="full-content  mb-0 "
                        label="Add Supervisor *"
                        colon={false}
                        name={[index, "supervisors"]}
                        rules={[
                          {
                            required: true,
                            message: "Please select your supervisor!",
                          },
                        ]}
                      >
                        <Select mode="multiple" options={supervisorOptions} />
                      </Form.Item>
                      <Form.Item
                        className="full-content  mb-0 "
                        label="Op/Lab *"
                        colon={false}
                        name={[index, "lab"]}
                        rules={[
                          {
                            required: true,
                            message: "Please select your Op/Lab!",
                          },
                        ]}
                      >
                        <Select options={labOptions} />
                      </Form.Item>

                      <Form.Item
                        className="full-content mb-0 "
                        colon={false}
                        label="Description of work"
                        name={[index, "description"]}
                      >
                        <Input.TextArea />
                      </Form.Item>

                      <Form.Item
                        className="full-content  mb-0 "
                        colon={false}
                        label="Labour Hour *"
                        name={[index, "labourHours"]}
                        rules={[
                          {
                            required: true,
                            message: "Please input your labour hours!",
                          },
                        ]}
                      >
                        <TimePicker
                          className="w-full"
                          colon={false}
                          onChange={(value) =>
                            handleCalculateRemainHours(
                              value,
                              index,
                              form.getFieldsValue("items")["items"][index]
                                .labourHours
                            )
                          }
                          allowClear={false}
                          showNow={false}
                          inputReadOnly
                          format={timeFormat}
                        />
                      </Form.Item>
                    </div>
                  </div>
                ))}
                {remainingHours !== "00:00" && (
                  <div className="flex justify-center">
                    <DefaultButton
                      isprimary="false"
                      className="mt-5 mb-10 w-64 h-8"
                      onClick={() => add()}
                      label="Add"
                    />
                  </div>
                )}
              </div>
            );
          }}
        </Form.List>
        <div className="my-0">
          {remainingHours === "00:00" && (
            <p className="lable-bg-color p-2 my-0">
              All hours have been allocated
            </p>
          )}
          <DefaultButton
            type="primary"
            className="p-2"
            label="Finish"
            htmlType="submit"
          />
        </div>
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.timesheet-allocation-form {
    .ant-form-item-label,
    .lable-bg-color {
      background-color: #e7e9fa;
      padding: 0 8px;
    }
  }
`;

TimesheetAllocation.propTypes = propTypes;
TimesheetAllocation.defaultProps = defaultProps;

export default TimesheetAllocation;
