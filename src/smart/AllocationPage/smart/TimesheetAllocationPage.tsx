import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TimesheetAllocationForm from "components/form/TimesheetAllocationForm";
import { notification } from "helpers/notification.helper";
import { AppContext } from "contexts/app.context";
import { Modal } from "antd";

const TimesheetAllocation = () => {
  const navigate = useNavigate();
  const { timesheetData, setAllocatedHours, setLoading } =
    useContext(AppContext);
  const [remainingHours, setRemainingHours] = useState(
    timesheetData.remainingHours
  );
  const handleSubmitAllocation = async (value:any) => {
    if (remainingHours !== "00:00") {
      notification({
        type: "error",
        message:
          "You still have Remaning Hours, Please allocate all of your work",
      });
      return false;
    }
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = true; //handle error when get error from the backend
        if (success) {
          Modal.success({
            content: (
              <p className="text-xl">Timesheet Allocation is completed</p>
            ),
            centered: true,
            closable: true,
            maskClosable: true,
            okButtonProps: { style: { display: "none" } },
            onCancel: () => navigate("/timesheet-page"),
          });
          setAllocatedHours(value.items);
          setRemainingHours("");
          setLoading(false);
          resolve(true);
        } else {
          notification({
            type: "error",
            message:
              "Fails to complete Timesheet Allocation, Please try again later! ",
          });
          setLoading(false);
          reject(false);
        }
      }, 3000);
    });
  };
  const handleSetRemaingHour = (value:string) => {
    setRemainingHours(value);
  };
  const propsTimesheetAllocationForm = {
    remainingHours,
    actualTime: timesheetData.actualTime,
    paidBreak: timesheetData.paidBreak,
    unpaidBreak: timesheetData.unpaidBreak,
    isLegalBreak: timesheetData.isLegalBreak,
    defaultBreak: timesheetData.defaultBreak,
    onSubmit: handleSubmitAllocation,
    onSetRemaingHour: handleSetRemaingHour,
  };
  return (
    <div>
      <TimesheetAllocationForm {...propsTimesheetAllocationForm} />
    </div>
  );
};

export default TimesheetAllocation;
