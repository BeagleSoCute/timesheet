import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInstance } from "antd/lib/form";
import { Form, TimePicker, Select, Input, InputNumber } from "antd";
import {
  supervisorOptions,
  jobTypeOptions,
  reasonCodeOptions,
} from "data/options";
import { convertToOrdinalNumber } from "helpers/common.helper";
import { timeFormat } from "constants/format";
import dayjs, { Dayjs } from "dayjs";
import { calRemainFromLabourHour } from "services/timesheet.service";
import { notification } from "helpers/notification.helper";
import DefaultButton from "components/common/Button";
import styled from "styled-components";
import {
  calculateNewRemainingTime,
  isValidBreakingTime,
  transformTimeToMs,
} from "services/timesheet.service";
import {
  renderFieldTitleSameLine,
  similarFormPropsForAllApp,
} from "helpers/form.helper";
import {
  defaultPaidBreaekType,
  timesheetAllocationFormType,
  timesheetAllocationAfterCompleteDataType,
  calRemainFromLabourHourReturnType,
} from "interface/index";
import { jobOptions, handleFilter, assetOptions } from "helpers/select.helper";
import { assetListType } from "interface/api.interface";

const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

interface PropsType {
  remainingHours: string;
  actualTime: string;
  paidBreak: number;
  unpaidBreak: number;
  isLegalBreak: boolean;
  jobLists: any;
  assetLists: assetListType[];
  defaultBreak: defaultPaidBreaekType;
  onSetRemaingHour: (data: string) => void;
  onSubmit: (data: timesheetAllocationFormType) => void;
  // handleChangeAsset: (assetName: string) => void;
}

const TimesheetAllocation = ({
  remainingHours,
  actualTime,
  paidBreak,
  unpaidBreak,
  isLegalBreak,
  jobLists,
  assetLists,
  defaultBreak,
  onSetRemaingHour,
  onSubmit,
}: // handleChangeAsset,
PropsType) => {
  const navigate = useNavigate();
  const [form] = Form.useForm() as [FormInstance<timesheetAllocationFormType>];
  const [workType, setWorkType] = useState<string>("");
  const [reasonCode, setReasonCode] = useState<string>("");
  const [previousUnpaidBrekingTime, setPreviousUnpaidBrekingTime] =
    useState<number>(unpaidBreak);
  const [previousPaidBrekingTime, setPreviousPaidBrekingTime] =
    useState(paidBreak);

  const handleSetWorkType = (value: string, index: number, field: any) => {
    //ANCHOR -handleSetWorktype
    console.log("index", index);
    console.log("field", field);
    //handleChangeAsset(value);
    let allItems = form.getFieldsValue(true)["items"];
    let thisform = form.getFieldsValue(true)["items"][index];
    console.log("this form----", form.getFieldsValue(true)["items"]);
    form.setFieldsValue({ [field.name]: { disabled: true } });

    if (value === "R&M") {
      thisform.job = "ASSET";
      thisform.isDisableJob = true;
      thisform.isDisableAsset = false;
    } else if (value === "Labour") {
      thisform.asset = "";
      thisform.isDisableAsset = true;
      thisform.isDisableJob = false;
    } else {
      thisform.isDisableAsset = false;
      thisform.isDisableJob = false;
    }
    allItems.splice(index, 1, thisform);
    form.setFieldsValue({ items: allItems });
  };

  const handleOnFinish = (value: timesheetAllocationFormType) => {
    onSubmit(value);
  };
  const handleCalculateRemainHours = async (
    value: Dayjs | null,
    index: number
  ) => {
    if (!value) {
      return;
    }
    const allItems: timesheetAllocationAfterCompleteDataType[] =
      form.getFieldsValue(true)["items"];
    let thisFormItem: timesheetAllocationAfterCompleteDataType =
      form.getFieldsValue(true)["items"][index];
    const previousLabourHour: Dayjs | null = thisFormItem.previousLabourHour;
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
    const modifyPreviousLabourHourD: string = previousLabourHour
      ? dayjs(previousLabourHour).format(timeFormat)
      : "";
    const labourHours: string = dayjs(value).format(timeFormat);
    const result: calRemainFromLabourHourReturnType =
      await calRemainFromLabourHour(
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
      const thisItem: timesheetAllocationAfterCompleteDataType = allItems[i];
      const thisLabourHours: string = dayjs(allItems[i - 1].labourHours).format(
        timeFormat
      );
      const result: calRemainFromLabourHourReturnType =
        await calRemainFromLabourHour(
          allItems[i - 1].remainingHours,
          thisLabourHours
        );
      thisItem.remainingHours = result.value;
      await allItems.splice(i, 1, thisItem); //update the item
    }
    await form.setFieldsValue({ items: allItems });
    onSetRemaingHour(result.value);
  };
  const handleRemove = async (
    index: number,
    remmove: (index: number) => void
  ) => {
    const thisIndex = index;
    const replacingIndex = index + 1;
    const allItems: timesheetAllocationAfterCompleteDataType[] =
      form.getFieldsValue(true)["items"];
    let thisFormItem: timesheetAllocationAfterCompleteDataType =
      form.getFieldsValue(true)["items"][thisIndex];
    let nextFormItem: timesheetAllocationAfterCompleteDataType =
      form.getFieldsValue(true)["items"][replacingIndex];
    const currentLabourHours: Dayjs | null =
      form.getFieldsValue(true)["items"][index].labourHours;
    const labourHours: string = dayjs(currentLabourHours).format(timeFormat);
    if (!currentLabourHours) {
      remmove(index);
      return;
    }
    if (allItems.length === thisIndex + 1) {
      const result: calRemainFromLabourHourReturnType =
        await calRemainFromLabourHour(
          remainingHours,
          labourHours,
          undefined,
          true
        );
      onSetRemaingHour(result.value);
      remmove(index);
      return;
    }
    const isReset = true;
    const result: calRemainFromLabourHourReturnType =
      await calRemainFromLabourHour(
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
      const thisItem: timesheetAllocationAfterCompleteDataType = allItems[i];
      const thisLabourHours: string = dayjs(allItems[i - 1].labourHours).format(
        timeFormat
      );
      const result: calRemainFromLabourHourReturnType =
        await calRemainFromLabourHour(
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
  const handleAdd = async (index: number, add: () => void) => {
    await add();
    const newFormItem: { remainingHours: string } = { remainingHours };
    const allItems = form.getFieldsValue(true)["items"];
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

  const handleChangeBreak = async (value: string, thisInput: string) => {
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
    const allItems: timesheetAllocationAfterCompleteDataType[] =
      form.getFieldsValue(true)["items"];
    const lastItem: timesheetAllocationAfterCompleteDataType =
      allItems[allItems.length - 1];
    const thisBreak: number =
      thisInput === "unpaidBreak"
        ? form.getFieldsValue().paidBreak
        : form.getFieldsValue().unpaidBreak;
    const totalBreak: number = parseInt(value) + thisBreak;
    const initialRemainingHours: string = await calculateNewRemainingTime(
      actualTime ? actualTime : "",
      totalBreak
    );
    const isValid: boolean = await isValidBreakingTime(
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
    let thisItem: timesheetAllocationAfterCompleteDataType;
    let resCal = "";
    for (let i = 0; i < allItems.length; i++) {
      thisItem = allItems[i];
      if (i === 0) {
        thisItem.remainingHours = initialRemainingHours;
        await allItems.splice(i, 1, thisItem); //update the item
      } else {
        const thisLabourHours: string = dayjs(
          allItems[i - 1].labourHours
        ).format(timeFormat);
        const result: calRemainFromLabourHourReturnType =
          await calRemainFromLabourHour(
            allItems[i - 1].remainingHours,
            thisLabourHours,
            undefined
          );
        thisItem.remainingHours = result.value;
        resCal = result.value;
        await allItems.splice(i, 1, thisItem); //update the item
      }
      const transLabourHour: number = allItems[i].labourHours
        ? transformTimeToMs(dayjs(allItems[i].labourHours).format(timeFormat))
        : 0;
      const transRemainingHour: number = transformTimeToMs(
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
      const thisLabourHours: string = dayjs(lastItem.labourHours).format(
        timeFormat
      );
      const result: calRemainFromLabourHourReturnType =
        await calRemainFromLabourHour(
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
  const formItemProps = {
    ...similarFormPropsForAllApp,
  };
  const halfFormItem = {
    labelCol: { span: 15 },
    wrapperCol: { span: 9 },
  };
  // [
  //   { id:"timesheet-allo",
  //    validateStatus:validatePaidBreak()
  //   },
  //   {

  //   },
  //   {}
  // ].map(({validateStatus})=>(<Form.Item  {...(validateStatus?{validateStatus}:{})}>children</Form.Item>))
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
            {...formItemProps}
            {...halfFormItem}
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
            {...formItemProps}
            {...halfFormItem}
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
          {(
            fields: [],
            { add, remove }: { add: () => void; remove: (data: number) => void }
          ) => {
            return (
              <div>
                {fields.map(
                  (
                    field: {
                      fieldKey: number;
                      isListField: boolean;
                      key: number;
                      name: number;
                    },
                    index: number
                  ) => (
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
                              onClick={() => handleRemove(index, remove)}
                            />
                          </Form.Item>
                        )}
                      </div>
                      <div>
                        <Form.Item
                          {...halfFormItem}
                          name={[index, "remainingHours"]}
                          label="Remaining Hours to Allocate:"
                          className="remain-hour mb-0 mt-1"
                        >
                          <Input className="col-span-4 text-right" readOnly />
                        </Form.Item>
                        <Form.Item
                          {...formItemProps}
                          className="full-content  mb-0 "
                          label="Work Type *"
                          name={[index, "workType"]}
                          rules={[
                            {
                              required: true,
                              message: "Please select your work type!",
                            },
                          ]}
                        >
                          <Select
                            options={jobTypeOptions}
                            onChange={(value) =>
                              handleSetWorkType(value, index, field)
                            }
                          />
                        </Form.Item>
                        <Form.Item
                          {...formItemProps}
                          className="full-content mb-0 "
                          label="Job *"
                          name={[index, "job"]}
                          rules={[
                            {
                              required: true,
                              message: "Please select your job!",
                            },
                          ]}
                        >
                          {/* ANCHOR */}
                          <Select
                            value={
                              form.getFieldsValue(true)["items"][index]?.job
                            }
                            disabled={
                              form.getFieldsValue(true)["items"][index]
                                ?.isDisableJob
                            }
                            // defaultValue={
                            //   workType === "R&M" ? "ASSET" : "ASSET"
                            // }
                            // disabled={
                            //   workType === "" || workType === "Labour"
                            //     ? true
                            //     : false
                            // }
                            options={jobOptions(jobLists)}
                            filterOption={handleFilter}
                          />
                        </Form.Item>

                        <Form.Item
                          {...formItemProps}
                          className="full-content mb-0 "
                          label="Asset *"
                          name={[index, "asset"]}
                          rules={[
                            {
                              required: true,
                              message: "Please select your job!",
                            },
                          ]}
                        >
                          <Select
                            // disabled={
                            //   workType === "" || workType === "Labour"
                            //     ? true
                            //     : false
                            // }
                            options={assetOptions(assetLists)}
                            filterOption={handleFilter}
                            disabled={
                              form.getFieldsValue(true)["items"][index]
                                ?.isDisableAsset
                            }
                          />
                        </Form.Item>
                        <Form.Item
                          {...formItemProps}
                          className="full-content mb-0 "
                          label="Add Supervisor *"
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
                          {...formItemProps}
                          className="full-content mb-0 "
                          label="Description of work"
                          name={[index, "description"]}
                        >
                          <Input.TextArea />
                        </Form.Item>

                        <Form.Item
                          {...formItemProps}
                          className="full-content mb-0 "
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
                                value ? value : null,
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
                  )
                )}
                {remainingHours !== "00:00" && (
                  <div className="flex justify-center">
                    <DefaultButton
                      disabled={
                        (
                          form.getFieldsValue(true)["items"] === undefined ||
                          form.getFieldsValue(true)["items"][fields.length - 1]
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
          <DefaultButton
            className="p-2"
            label="Cancel"
            onClick={() => navigate("/timesheet-page")}
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

export default TimesheetAllocation;
