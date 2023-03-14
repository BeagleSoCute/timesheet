import React, { useEffect } from "react";
import { Button, Form, InputNumber, Select, Input } from "antd";
import { jobOptions } from "data/options";
import { convertToOrdinalNumber } from "helpers/common.helper";

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

const TimesheetAllocation = () => {
  const [form] = Form.useForm();

  const handleOnFinish = () => {};
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
                    <Form.Item
                      // {...field}
                      key={field.key}
                      label="Remaining Hours to Allocate"
                      name={[index, "remainingHour"]}
                      className="bg-gray-300  p-1 "
                      // rules={[
                      //   { required: true, message: "Please input your remaining hours!" },
                      // ]}
                    >
                      <InputNumber controls={false} />
                    </Form.Item>

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
                      <InputNumber controls={false} />
                    </Form.Item>
                    <Form.Item>
                      <Button onClick={() => remove(field.name)}>
                        Remove{" "}
                      </Button>
                    </Form.Item>
                  </div>
                ))}
                <Form.Item>
                  <Button onClick={() => add()}>Add </Button>
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
