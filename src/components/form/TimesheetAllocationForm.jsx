import React from "react";
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

  const handleOnFinish = (value) => {
    onSubmit(value);
  };
  const handleCalculateRemainHours = async (value, index) => {
    const allItems = form.getFieldsValue("items")["items"];
    let thisFormItem = form.getFieldsValue("items")["items"][index];
    const previousLabourHour = thisFormItem.previousLabourHour;
    if (value.hour() === 0 && value.minute() === 0) {
      thisFormItem = {
        ...thisFormItem,
        labourHours: previousLabourHour,
      };
      await allItems.splice(index, 1, thisFormItem);
      form.setFieldsValue({ items: allItems });
      notification({
        type: "error",
        message: "Labour hour can not be 0, Please try again",
      });
      return;
    }
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
      allItems.splice(index, 1, thisFormItem);
      form.setFieldsValue({ items: allItems });
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
    allItems.splice(index, 1, thisFormItem);
    //handle update remaining hour in other form item
    for (let i = index + 1; i < allItems.length; i++) {
      const thisItem = allItems[i];
      const thisLabourHours = dayjs(allItems[i - 1].labourHours).format(
        timeFormat
      );
      const result = await calRemainFromLabourHour(
        allItems[i - 1].remainingHours,
        thisLabourHours,
        undefined
      );
      thisItem.remainingHours = result.value;
      allItems.splice(i, 1, thisItem); //update the item
    }
    form.setFieldsValue({ items: allItems });
    onSetRemaingHour(result.value);
  };
  const handleRemove = async (fieldName, index, remmove) => {
    const thisIndex = index;
    const replacingIndex = index + 1;
    const allItems = form.getFieldsValue("items")["items"];
    let thisFormItem = form.getFieldsValue("items")["items"][thisIndex];
    let nextFormItem = form.getFieldsValue("items")["items"][replacingIndex];
    const currentLabourHours =
      form.getFieldsValue("items")["items"][index].labourHours;
    const labourHours = dayjs(currentLabourHours).format(timeFormat);
    if (!currentLabourHours) {
      remmove(fieldName);
      return;
    }
    if (allItems.length === thisIndex + 1) {
      const result = await calRemainFromLabourHour(
        remainingHours,
        labourHours,
        undefined,
        true
      );
      onSetRemaingHour(result.value);
      remmove(fieldName);
      return;
    }
    const isReset = true;
    const result = await calRemainFromLabourHour(
      remainingHours,
      labourHours,
      undefined,
      isReset
    );
    nextFormItem = {
      ...nextFormItem,
      remainingHours: thisFormItem.remainingHours,
    };
    await allItems.splice(replacingIndex, 1, nextFormItem);
    form.setFieldsValue({ items: allItems });
    // After replacing form item, the recalculate the remaing hour for each item
    for (let i = replacingIndex + 1; i < allItems.length; i++) {
      const thisItem = allItems[i];
      const thisLabourHours = dayjs(allItems[i - 1].labourHours).format(
        timeFormat
      );
      const result = await calRemainFromLabourHour(
        allItems[i - 1].remainingHours,
        thisLabourHours,
        undefined
      );
      thisItem.remainingHours = result.value;
      allItems.splice(i, 1, thisItem); //update the item
    }
    allItems.splice(thisIndex, 1); //remove the selected item
    form.setFieldsValue({ items: allItems });
    onSetRemaingHour(result.value);
  };
  const handleAdd = async (index, add) => {
    await add();
    //Assign remaining hour to new item
    const allItems = form.getFieldsValue("items")["items"];
    const newFormItem = form.getFieldsValue("items")["items"][index + 1];
    newFormItem.remainingHours = remainingHours;
    allItems.splice(index + 1, 1, newFormItem);
    form.setFieldsValue({ items: allItems });
  };

  const initialValues = {
    paidBreak: 555,
    unpaidBreak: 222,
    items: [
      {
        remainingHours,
      },
    ],
  };
  return (
    <StyledDiv className="timesheet-allocation-form">
      <Form
        {...formItemLayout}
        initialValues={initialValues}
        requiredMark={false}
        id="timesheet-allo"
        form={form}
        name="timesheet-allocation-form"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={handleOnFinish}
      >
        <div className="break-time-container mt-10 mb-5 p-2">
          <Form.Item
            labelCol={{ span: 15 }}
            wrapperCol={{ span: 9 }}
            label="Paid break"
            name="paidBreak"
            className=""
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 15 }}
            wrapperCol={{ span: 9 }}
            label="Unpaid break"
            name="unpaidBreak"
            className="mb-0"
          >
            <Input />
          </Form.Item>
        </div>

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
                        <Form.Item className="my-auto px-1">
                          <DefaultButton
                            className="no-color-button w-full h-full "
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
                      <Form.Item
                        labelCol={{ span: 15 }}
                        wrapperCol={{ span: 9 }}
                        name={[index, "remainingHours"]}
                        label="Remaining Hours to Allocate:"
                        className="remain-hour mb-0 mt-1"
                      >
                        {/* <span className="font-bold col-span-8 my-auto ">
                          Remaining Hours to Allocate:
                        </span> */}
                        <Input
                          className="col-span-4 text-right"
                          readOnly
                          // value={
                          //   form.getFieldsValue("items")["items"][index]
                          //     ?.remainingHours
                          // }
                        />
                      </Form.Item>
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
                        className="full-content mb-0 "
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
                      disabled={
                        form.getFieldsValue("items")["items"] &&
                        form.getFieldsValue("items")["items"][fields.length - 1]
                          ?.labourHours === undefined
                          ? true
                          : false
                      }
                      isprimary="false"
                      className="no-color-button mt-5 mb-10 w-64 h-8  "
                      onClick={() => handleAdd(fields.length - 1, add)}
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
      padding: 0px 0px 0px 8px;
    }
    .break-time-container {
      background-color: #e7e9fa;
    }
  }
`;

TimesheetAllocation.propTypes = propTypes;
TimesheetAllocation.defaultProps = defaultProps;

export default TimesheetAllocation;
