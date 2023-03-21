import React from "react";
import { Button, Form, TimePicker, Select, Input } from "antd";
import { jobOptions } from "data/options";
import { convertToOrdinalNumber } from "helpers/common.helper";
import { timeFormat } from "constants/format";
import dayjs from "dayjs";
import { calRemainFromLabourHour } from "services/timesheet.service";
import PropTypes from "prop-types";

const propTypes = {
  remainingHours: PropTypes.string,
  handleSetRemaingHour: PropTypes.func,
};
const defaultProps = {
  remainingHours: "",
  handleSetRemaingHour: () => {},
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

const initialValues = {
  remainingHour: "6",
};

const TimesheetAllocation = ({
  form,
  remainingHours,
  handleSetRemaingHour,
}) => {
  const handleOnFinish = () => {};

  const handleCalculateRemainHours = async (value, index) => {
    console.log("----called", index);
    const items = form.getFieldsValue("items")["items"];
    let thisFormItem = form.getFieldsValue("items")["items"][index];
    const previousLabourHour = thisFormItem.previousLabourHour;

    const modifyPreviousLabourHourD = previousLabourHour
      ? dayjs(previousLabourHour).format(timeFormat)
      : undefined;

    console.log("modifyPreviousLabourHourD", modifyPreviousLabourHourD);

    const labourHours = dayjs(value).format(timeFormat);
    console.log("labourHours", labourHours);

    const result = await calRemainFromLabourHour(
      remainingHours,
      labourHours,
      modifyPreviousLabourHourD
    );
    if (!result.isSuccess) {
      //No set previous and keep the labour value
      thisFormItem = {
        ...thisFormItem,
        labourHours: previousLabourHour,
      };
      items.splice(index, 1, thisFormItem);
      form.setFieldsValue({ items });
      return;
    }

    thisFormItem = {
      ...thisFormItem,
      previousLabourHour: value,
    };
    items.splice(index, 1, thisFormItem);
    form.setFieldsValue({ items });
    console.log("remaining hours is ", result.value);
    console.log("thisFormItem---==--", thisFormItem);
    handleSetRemaingHour(result.value);
  };

  const handleRemove = (fieldName, remmove) => {
    console.log("removee");
    remmove(fieldName);
  };

  return (
    <div className="timesheet-allocation px-12 py-5">
      <Form
        form={form}
        name="timesheet-allocation-form"
        {...formItemLayout}
        // initialValues={initialValues}
        // onFinish={handleOnFinish}
        // autoComplete="off"
      >
        <Form.List initialValues={initialValues} name="items">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <div key={field.key}>
                    <div className="bg-gray-700  px-4 text-white">
                      <h1 className="text-2xl	">
                        {convertToOrdinalNumber(index)} Allocation
                      </h1>
                    </div>

                    <div className="remain-hour  flex justify-between px-2 mb-6">
                      <span>Remaining Hours to Allocate:</span>
                      <span className="text-2xl">{remainingHours}</span>
                    </div>

                    <Form.Item
                      // {...field}

                      label="Job"
                      name={[index, "job"]}
                      rules={[
                        {
                          required: true,
                          message: "Please select your Op/Lab!",
                        },
                      ]}
                    >
                      <Select options={jobOptions} />
                    </Form.Item>

                    <Form.Item
                      // {...field}
                      label="Add Supervisor"
                      name={[index, "supervisors"]}
                    >
                      <Select mode="multiple" options={jobOptions} />
                    </Form.Item>
                    <Form.Item
                      // {...field}
                      label="Op/Lab"
                      name="lab"
                      rules={[
                        {
                          required: true,
                          message: "Please select your Op/Lab!",
                        },
                      ]}
                    >
                      <Select options={jobOptions} />
                    </Form.Item>

                    <Form.Item
                      // {...field}
                      label="Description of work"
                      name={[index, "description"]}
                    >
                      <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                      // {...field}
                      label="Labour Hour"
                      name={[index, "labourHours"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input your labour hours!",
                        },
                      ]}
                    >
                      <TimePicker
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
                    <Form.Item>
                      <Button onClick={() => handleRemove(field.name, remove)}>
                        Remove
                      </Button>
                    </Form.Item>
                  </div>
                ))}
                <Form.Item>
                  <Button onClick={() => add()}>Add</Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Form>
    </div>
  );
};

TimesheetAllocation.propTypes = propTypes;
TimesheetAllocation.defaultProps = defaultProps;

export default TimesheetAllocation;
