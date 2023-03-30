import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/app.context";
import TimesheetForm from "components/form/TimesheetForm";
import {
  calculateRemainHours,
  trasformSubmitAllocatedHours,
} from "services/timesheet.service";
import { notification } from "helpers/notification.helper";
import { Button } from "antd";
import TableData from "components/common/TableData";

const tableColums = [
  {
    title: "Job",
    dataIndex: "job",
    key: "job",
  },
  {
    title: "CC",
    dataIndex: "supervisors",
    key: "supervisors",
  },
  {
    title: "Op/Lab",
    dataIndex: "lab",
    key: "lab",
  },
  {
    title: "Asset",
    dataIndex: "asset",
    key: "asset",
  },
  {
    title: "Hours",
    dataIndex: "labourHours",
    key: "labourHours",
  },
];

const TimesheetPage = () => {
  const navigate = useNavigate();
  const {
    timesheetData,
    allocatedData,
    setRemainingHours,
    clearTimesheetData,
  } = useContext(AppContext);
  const handleSubmit = async (value) => {
    console.log("handleSubmit", value);
    const res = await calculateRemainHours(value);
    setRemainingHours(res);
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
    data: timesheetData,
    onSubmit: handleSubmit,
  };
  const propsTableData = {
    columns: tableColums,
    data: trasformSubmitAllocatedHours(allocatedData),
  };
  return (
    <div className="timesheet-page">
      <TimesheetForm {...propsTimesheetForm} />
      {allocatedData.length !== 0 && (
        <>
          <div className="mt-20 font-bold">
            <p>Allocated hours</p>
            <TableData {...propsTableData} />
          </div>
          <Button onClick={() => handleSignout()}>Sign out</Button>
        </>
      )}
    </div>
  );
};
export default TimesheetPage;
