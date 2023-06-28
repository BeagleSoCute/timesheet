import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/app.context";
import TimesheetForm from "smart/TimesheetPage/components/TimesheetForm";
import AllocationData from "components/common/AllocationData";
import { mergeEndDateAndTime } from "helpers/dateTime.helper";
import { FormInstance } from "antd/lib/form";
import {
  calculateRemainingHours,
  trasformSubmitAllocatedHours,
} from "services/timesheet.service";
import { notification } from "helpers/notification.helper";
import Button from "components/common/Button";
import { Form } from "antd";
import { signoutDataType, timesheetPageFormType } from "interface";
import dayjs from "dayjs";

const TimesheetPage = () => {
  const [form] = Form.useForm() as [FormInstance<timesheetPageFormType>];

  const navigate = useNavigate();
  const {
    timesheetData,
    allocatedData,
    signoutData,
    signoutTime,
    setSignoutData,
    clearTimesheetData,
    setSignoutTime,
    setTimesheetAllocationData,
  } = useContext(AppContext);

  useEffect(() => {
    if (!signoutTime) {
      setSignoutTime(dayjs());
    }
  }, []);

  const handleSubmit = async (value: signoutDataType) => {
    console.log("valueeeeee", value);
    const calculateProps = {
      startDateTime: value.startDateTime,
      breaksTime: value.breaksTime,
      finishDateTime: value.finishDateTime,
    };
    const { isSuccess, res } = await calculateRemainingHours(calculateProps);
    if (!isSuccess) {
      notification({
        type: "error",
        message:
          "Your break time exceed the finish time, please input the break time again!",
      });
      form.resetFields(["breaksTime"]);
      return false;
    }
    if (res) {
      setTimesheetAllocationData({
        paidBreak: res.paidBreak,
        unpaidBreak: res.unpaidBreak,
        isLegalBreak: res.isLegalBreak,
        remainingHours: res.remainingTime,
        actualTime: res.actualTime,
        defaultBreak: res.defaultBreak,
      });
      setSignoutData(value);
      navigate("/timesheet-allocation");
    } else {
      notification({
        type: "error",
        message: "There is an error in the system, Please try again later",
      });
    }
  };
  const handleSignout = () => {
    notification({
      type: "success",
      message: "Sign out Success",
    });
    clearTimesheetData();
    navigate("/");
  };
  const propsTimesheetForm = {
    form,
    signoutData,
    startDateTime: mergeEndDateAndTime(
      timesheetData.work_date,
      timesheetData.start_time
    ),
    signoutTime,
    onSubmit: handleSubmit,
  };
  return (
    <div className="timesheet-page">
      <TimesheetForm {...propsTimesheetForm} />
      {allocatedData.length !== 0 && (
        <>
          <div className="mt-20">
            <AllocationData
              data={trasformSubmitAllocatedHours(allocatedData)}
            />
          </div>
          <div className="flex justify-center mb-10">
            <Button
              type="primary"
              label="Sign out"
              onClick={() => handleSignout()}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default TimesheetPage;
