import React, { useState } from "react";
import { Form, TimePicker, Select, Input, InputNumber } from "antd";
import {
  jobOptions,
  supervisorOptions,
  labOptions,
  reasonCodeOptions,
} from "data/options";
import { convertToOrdinalNumber } from "helpers/common.helper";
import { timeFormat } from "constants/format";
import dayjs from "dayjs";
import { calRemainFromLabourHour } from "services/timesheet.service";
import PropTypes from "prop-types";
import { notification } from "helpers/notification.helper";
import DefaultButton from "components/common/Button";
import styled from "styled-components";
import {
  calculateNewRemainingTime,
  isValidBreakingTime,
  transformTimeToMs,
} from "services/timesheet.service";
import { renderFieldTitleSameLine } from "helpers/form.helper";
import {defaultPaidBreaek} from "interface/index"
const propTypes = {
  remainingHours: PropTypes.string,
  paidBreak: PropTypes.number,
  unpaidBreak: PropTypes.number,
  actualTime: PropTypes.string,
  isLegalBreak: PropTypes.bool,
  onSetRemaingHour: PropTypes.func,
  defaultBreak: PropTypes.object,
  onSubmit: PropTypes.func,
};
const defaultProps = {
  remainingHours: "",
  actualTime: "",
  paidBreak: 0,
  unpaidBreak: 0,
  isLegalBreak: true,
  defaultBreak: { paidBreak: 10, unpaidBreak: 30 },
  onSetRemaingHour: () => {},
  onSubmit: (data:any) => {},
};

const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

interface PropsType {
  remainingHours:string,
  actualTime:string,
  paidBreak:number,
  unpaidBreak:number,
  isLegalBreak:boolean,
  onSetRemaingHour: (data:string) => void,
  defaultBreak:defaultPaidBreaek,
  onSubmit: (data:any) => void,
}

const TimesheetAllocation = ({
  remainingHours,
  actualTime,
  paidBreak,
  unpaidBreak,
  isLegalBreak,
  onSetRemaingHour,
  defaultBreak,
  onSubmit,
}:PropsType) => {
  const [form] = Form.useForm();
  const [reasonCode, setReasonCode] = useState("");
  const [previousUnpaidBrekingTime, setPreviousUnpaidBrekingTime] =
    useState(unpaidBreak);
  const [previousPaidBrekingTime, setPreviousPaidBrekingTime] =
    useState(paidBreak);

  const handleOnFinish = (value:any) => {
    onSubmit(value);
  };
  const handleCalculateRemainHours = async (value:any, index:number) => {
    const allItems = form.getFieldsValue(true)["items"];
    let thisFormItem = form.getFieldsValue(true)["items"][index];
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
      : "";
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
    await allItems.splice(index, 1, thisFormItem);
    //handle update remaining hour in other form item
    for (let i = index + 1; i < allItems.length; i++) {
      const thisItem = allItems[i];
      const thisLabourHours = dayjs(allItems[i - 1].labourHours).format(
        timeFormat
      );
      const result = await calRemainFromLabourHour(
        allItems[i - 1].remainingHours,
        thisLabourHours
      );
      thisItem.remainingHours = result.value;
      await allItems.splice(i, 1, thisItem); //update the item
    }
    await form.setFieldsValue({ items: allItems });
    onSetRemaingHour(result.value);
  };
  const handleRemove = async (fieldName:string, index:number, remmove:(data:string) => void) => {
    const thisIndex = index;
    const replacingIndex = index + 1;
    const allItems = form.getFieldsValue(true)["items"];
    let thisFormItem = form.getFieldsValue(true)["items"][thisIndex];
    let nextFormItem = form.getFieldsValue(true)["items"][replacingIndex];
    const currentLabourHours =
      form.getFieldsValue(true)["items"][index].labourHours;
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
      allItems.splice(i, 1, thisItem);
    }
    allItems.splice(thisIndex, 1);
    form.setFieldsValue({ items: allItems });
    onSetRemaingHour(result.value);
  };
  const handleAdd = async (index:number, add: () => void) => {
    await add();
    const allItems = form.getFieldsValue(true)["items"];
    const newFormItem = form.getFieldsValue(true)["items"][index + 1];
    newFormItem.remainingHours = remainingHours;
    allItems.splice(index + 1, 1, newFormItem);
    form.setFieldsValue({ items: allItems });
  };

  const validateUnpaidBreak = () => {
    if (reasonCode === "codeA" || reasonCode === "codeB") {
      return "error";
    } else {
      return "";
    }
  };

  const validatePaidBreak = () => {
    if (reasonCode === "codeC") {
      return "error";
    } else {
      return "";
    }
  };

  const handleChangeBreak = async (value:string, thisInput:string) => {
    if (value === "") {
      if (thisInput === "unpaidBreak") {
        form.setFieldValue("unpaidBreak", previousUnpaidBrekingTime);
      } else {
        form.setFieldValue("paidBreak", previousPaidBrekingTime);
      }
      notification({
        type: "error",
        message: "Break time can not be empty",
      });
      return;
    }
    const allItems = form.getFieldsValue(true)["items"];
    const lastItem = allItems[allItems.length - 1];
    const thisBreak =
      thisInput === "unpaidBreak"
        ? form.getFieldsValue().paidBreak
        : form.getFieldsValue().unpaidBreak;
    const totalBreak = parseInt(value) + parseInt(thisBreak);
    const initialRemainingHours = await calculateNewRemainingTime(
      actualTime,
      totalBreak
    );
    const isValid = await isValidBreakingTime(
      actualTime,
      totalBreak,
      thisInput === "unpaidBreak"
        ? previousUnpaidBrekingTime
        : previousPaidBrekingTime
    );
    if (!isValid) {
      if (thisInput === "unpaidBreak") {
        form.setFieldValue("unpaidBreak", previousUnpaidBrekingTime);
      } else {
        form.setFieldValue("paidBreak", previousPaidBrekingTime);
      }
      notification({
        type: "error",
        message:
          "Break time can not excess or equal to the remaining hour, Please try again",
      });
      return;
    }
    let isLabourHourExcess = false;
    let thisItem;
    let resCal ='';
    for (let i = 0; i < allItems.length; i++) {
      thisItem = allItems[i];
      if (i === 0) {
        thisItem.remainingHours = initialRemainingHours;
        await allItems.splice(i, 1, thisItem); //update the item
      } else {
        const thisLabourHours = dayjs(allItems[i - 1].labourHours).format(
          timeFormat
        );
        const result = await calRemainFromLabourHour(
          allItems[i - 1].remainingHours,
          thisLabourHours,
          undefined
        );
        thisItem.remainingHours = result.value;
        resCal = result.value;
        await allItems.splice(i, 1, thisItem); //update the item
      }
      const transLabourHour = allItems[i].labourHours
        ? transformTimeToMs(dayjs(allItems[i].labourHours).format(timeFormat))
        : 0;
      const transRemainingHour = transformTimeToMs(
        i === 0 ? initialRemainingHours : resCal
      );
      if (transLabourHour > transRemainingHour) {
        isLabourHourExcess = true;
        notification({
          type: "error",
          message:
            "Labour hour can not excess the remaining hour, Please try again",
        });
        break;
      }
    }
    if (isLabourHourExcess) {
      if (thisInput === "unpaidBreak") {
        form.setFieldValue("unpaidBreak", previousUnpaidBrekingTime);
      } else {
        form.setFieldValue("paidBreak", previousPaidBrekingTime);
      }
      return;
    }
    if (lastItem.labourHours) {
      const thisLabourHours = dayjs(lastItem.labourHours).format(timeFormat);
      const result = await calRemainFromLabourHour(
        lastItem.remainingHours,
        thisLabourHours,
        undefined
      );
      onSetRemaingHour(result.value);
    } else {
      onSetRemaingHour(lastItem.remainingHours);
    }
    await form.setFieldsValue({ items: allItems });

    if (thisInput === "unpaidBreak") {
      setPreviousUnpaidBrekingTime(parseInt(value));
    } else {
      setPreviousPaidBrekingTime(parseInt(value));
    }
  };

  const initialValues = {
    paidBreak,
    unpaidBreak,
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
            colon={false}
            labelCol={{ span: 15 }}
            wrapperCol={{ span: 9 }}
            label={renderFieldTitleSameLine(
              "Paid break",
              `(Default paid break is ${defaultBreak?.paidBreak})`
            )}
            name="paidBreak"
            validateStatus={validatePaidBreak()}
            rules={[
              {
                required: true,
                message: "Please select paid break",
              },
            ]}
          >
            <InputNumber
              onBlur={(e) => handleChangeBreak(e.target.value, "paidBreak")}
              className="w-full"
              controls={false}
            />
          </Form.Item>
          <Form.Item
            colon={false}
            labelCol={{ span: 15 }}
            wrapperCol={{ span: 9 }}
            label={renderFieldTitleSameLine(
              "Unpaid break",
              `(Default unpaid break is ${defaultBreak?.unpaidBreak})`
            )}
            name="unpaidBreak"
            className="mb-0"
            validateStatus={validateUnpaidBreak()}
            rules={[
              {
                required: true,
                message: "Please select unpaid break",
              },
            ]}
          >
            <InputNumber
              onBlur={(e) => handleChangeBreak(e.target.value, "unpaidBreak")}
              className="w-full"
              controls={false}
            />
          </Form.Item>

          {!isLegalBreak && (
            <div className="mt-5">
              <Form.Item
                label="Reason Code *"
                name="reasonCode"
                rules={[
                  {
                    required: true,
                    message: "Please select reason code",
                  },
                ]}
              >
                <Select
                  onSelect={(value) => setReasonCode(value)}
                  options={reasonCodeOptions}
                />
              </Form.Item>
              <Form.Item
                label="Reason *"
                name="reason"
                rules={[
                  {
                    required: true,
                    message: "Please give a reason",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </div>
          )}
        </div>

        <Form.List name="items">
          {(fields:any, { add, remove }: { add: () => void; remove: (data: any) => void } ) => {
            return (
              <div>
                {fields.map((field:any, index:number) => (
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
                          onChange={(value) =>
                            handleCalculateRemainHours(
                              value,
                              index
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
                        (
                          form.getFieldsValue(true)["items"] === undefined ||
                          form.getFieldsValue(true)["items"][
                            fields.length - 1
                          ]
                        )?.labourHours === undefined
                          ? true
                          : false
                      }
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