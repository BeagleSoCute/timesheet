import React, { useEffect, useState } from "react";
import { Button, Form, TimePicker, Select, Input } from "antd";
import { jobOptions } from "data/options";
import { convertToOrdinalNumber } from "helpers/common.helper";
import { timeFormat } from "constants/format";
import dayjs from "dayjs";
import { calRemainFromLabourHour } from "services/timesheet.service";

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

const TimesheetAllocation = ({ remainingHours }) => {
  const [form] = Form.useForm();
  const [remain, setRemain] = useState(remainingHours);

  const handleOnFinish = () => {};

  const handleCalculateRemainHours = async (index, addFunc, removeFunc) => {
    console.log("----called");
    const labourHours = dayjs(
      form.getFieldsValue().items[index].labourHours
    ).format(timeFormat);
    const totalHours = calRemainFromLabourHour(remain, labourHours);

    setRemain(totalHours);

    // console.log("remain", remain);
    // console.log("labourHours", labourHours);
    // console.log("totalHours", totalHours);
    // const totalHours = remainingHour - labourHours; //calhere
    if (totalHours !== "0:00") {
      addFunc();
    }
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
                      <span className="text-2xl">{remain}</span>
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
                        onChange={() =>
                          handleCalculateRemainHours(index, add, remove)
                        }
                        allowClear={false}
                        showNow={false}
                        inputReadOnly
                        format={timeFormat}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button onClick={() => remove(field.name)}>Remove</Button>
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

export default TimesheetAllocation;
