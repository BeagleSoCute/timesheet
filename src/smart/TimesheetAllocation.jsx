import React, { useContext } from "react";
import TimesheetAllocationForm from "components/form/TimesheetAllocationForm";
import { notification } from "helpers/notification.helper";
import { AppContext } from "contexts/app.context";
import { Modal } from "antd";

const TimesheetAllocation = () => {
  const { remainingHours, setAllocatedHours, setRemainingHour } =
    useContext(AppContext);
  const handleSubmitAllocation = async (value) => {
    console.log("handleSubmitModal", value);
    if (remainingHours !== "00:00") {
      notification({
        type: "error",
        message:
          "You still have Remaning Hours, Please allocate all of your work",
      });
      return false;
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = true; //handler error when get error from the backend
        if (success) {
          Modal.success({
            content: (
              <p className="text-xl">Timesheet Allocstion is completed</p>
            ),
            centered: true,
            closable: true,
            maskClosable: true,
            okButtonProps: { style: { display: "none" } },
            onCancel: () => setRemainingHour(""),
          });
          setAllocatedHours(value);
          setRemainingHour("");
          resolve(true);
        } else {
          notification({
            type: "error",
            message:
              "Fails to complete Timesheet Allocation, Please try again later! ",
          });
          reject(false);
        }
      }, 3000);
    });
  };

  const propsTimesheetAllocationForm = {
    onSubmit: handleSubmitAllocation,
  };
  return (
    <div>
      <TimesheetAllocationForm {...propsTimesheetAllocationForm} />
    </div>
  );
};

export default TimesheetAllocation;
