import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TimesheetAllocationForm from "components/form/TimesheetAllocationForm";
import { notification } from "helpers/notification.helper";
import { AppContext } from "contexts/app.context";
import { Modal } from "antd";

const TimesheetAllocation = () => {
  const navigate = useNavigate();
  const { remainingHours, setAllocatedHours, setLoading, setRemainingHours } =
    useContext(AppContext);
  const handleSubmitAllocation = async (value) => {
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
            onCancel: () => navigate("/timesheet-page"),
          });
          setAllocatedHours(value);
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
  const handleSetRemaingHour = (value) => {
    setRemainingHours(value);
  };
  const propsTimesheetAllocationForm = {
    remainingHours,
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
