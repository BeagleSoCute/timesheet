import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TimesheetAllocationForm from "components/form/TimesheetAllocationForm";
import { notification } from "helpers/notification.helper";
import { AppContext } from "contexts/app.context";
import { Modal } from "antd";
import { timesheetAllocationFormType } from "interface";
import {
  getJobLists,
  getAssetLists,
  getOptions,
} from "services/getAPI.services";

const TimesheetAllocation = () => {
  const [jobLists, setJobLists] = useState<any>();
  const [assetLists, setAssetLists] = useState<any>();
  const navigate = useNavigate();
  useEffect(() => {
    const init = async () => {
      const { success, jobLists, assetLists } = await getOptions();
      if (!success) {
        return;
      }
      setJobLists(jobLists);
      setAssetLists(assetLists);
    };
    init();
  }, []);
  const { timesheetAllocationData, setAllocatedHours, setLoading } =
    useContext(AppContext);
  const [remainingHours, setRemainingHours] = useState<string>(
    timesheetAllocationData.remainingHours
      ? timesheetAllocationData.remainingHours
      : "00:00"
  );
  const handleSubmitAllocation = async (value: timesheetAllocationFormType) => {
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
  const handleSetRemaingHour = (value: string): void => {
    setRemainingHours(value);
  };
  const propsTimesheetAllocationForm = {
    remainingHours,
    actualTime: timesheetAllocationData.actualTime,
    paidBreak: timesheetAllocationData.paidBreak,
    unpaidBreak: timesheetAllocationData.unpaidBreak,
    isLegalBreak: timesheetAllocationData.isLegalBreak,
    defaultBreak: timesheetAllocationData.defaultBreak,
    jobLists,
    assetLists,
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
