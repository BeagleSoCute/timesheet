import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/app.context";
import TimesheetForm from "smart/SignoutPage/components/TimesheetForm";
import AllocationData from "components/common/AllocationData";
import {
  calculateRemainingHours,
  trasformSubmitAllocatedHours,
} from "services/timesheet.service";
import { notification } from "helpers/notification.helper";
import Button from "components/common/Button";
import { Form } from "antd";

const TimesheetPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { timesheetData, allocatedData, clearTimesheetData, setTimesheetData } =
    useContext(AppContext);
  const handleSubmit = async (value) => {
    const { isSuccess, res } = await calculateRemainingHours(value);
    if (!isSuccess) {
      notification({
        type: "error",
        message:
          "Your break time exceed the finish time, please input the break time again!",
      });
      form.resetFields(["breaksTime"]);
      return false;
    }
    setTimesheetData({
      ...timesheetData,
      paidBreak: res.paidBreak,
      unpaidBreak: res.unpaidBreak,
      isLegalBreak: res.isLegalBreak,
      remainingHours: res.remainingTime,
      actualTime: res.actualTime,
    });
    navigate("/timesheet-allocation");
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
    data: timesheetData,
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
