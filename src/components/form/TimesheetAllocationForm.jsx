import React, { useEffect } from "react";
import { Button, Form, TimePicker, Select, Input } from "antd";
import { jobOptions, supervisorOptions, labOptions } from "data/options";
import { convertToOrdinalNumber } from "helpers/common.helper";
import { timeFormat } from "constants/format";
import dayjs from "dayjs";
import { calRemainFromLabourHour } from "services/timesheet.service";
import PropTypes from "prop-types";
import { notification } from "helpers/notification.helper";

const propTypes = {
  remainingHours: PropTypes.string,
  handleSetRemaingHour: PropTypes.func,
  handleOnOk: PropTypes.func,
};
const defaultProps = {
  remainingHours: "",
  handleSetRemaingHour: () => {},
  handleOnOk: () => {},
};

const TimesheetAllocation = ({
  remainingHours,
  handleSetRemaingHour,
  handleOnOk,
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
    handleOnOk(items);
  };
  const handleCalculateRemainHours = async (value, index) => {
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
    handleSetRemaingHour(result.value);
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
    handleSetRemaingHour(result.value);
    remmove(fieldName);
  };
  return (
    <div className="timesheet-allocation px-12 py-5">
      <Form
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
                  <div className="form-item mb-10" key={field.key}>
                    <div className="bg-blue-900  px-4 text-white flex justify-between ">
                      <h1 className="text-2xl my-3	">
                        {convertToOrdinalNumber(index)} ALLOCATION
                      </h1>
                      {fields.length > 1 && (
                        <Form.Item className="my-auto">
                          <Button
                            onClick={() =>
                              handleRemove(field.name, index, remove)
                            }
                          >
                            Remove
                          </Button>
                        </Form.Item>
                      )}
                    </div>
                    <div className="remain-hour  grid  grid-cols-12 ">
                      <span className="font-bold col-span-10 my-auto">
                        Remaining Hours to Allocate:
                      </span>
                      <Input
                        className="col-span-2 text-right"
                        readOnly
                        value={0}
                      />
                    </div>
                    <Form.Item
                      colon={false}
                      label="Job"
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
                      label="Add Supervisor"
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
                      label="Op/Lab"
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
                      colon={false}
                      label="Description of work"
                      name={[index, "description"]}
                    >
                      <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                      colon={false}
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
                ))}
                <div className="flex justify-center">
                  <Button
                    disabled={remainingHours === "00:00"}
                    className="w-2/3 mt-5"
                    onClick={() => add()}
                  >
                    Add
                  </Button>
                </div>
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
