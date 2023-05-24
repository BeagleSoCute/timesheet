import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeData } from "services/employee.service";
import Message from "components/common/Message";
import AssignEmployeeTimesheetForm from "smart/SupervisorPage/components/AssignEmployeeTimesheetForm";
import TimesheetAllocationForm from "components/form/TimesheetAllocationForm";
import {
  calculateRemainingHours,
  trasformSubmitAllocatedHours,
} from "services/timesheet.service";
import { notification } from "helpers/notification.helper";
import AllocationData from "components/common/AllocationData";
import Button from "components/common/Button";

const renderDetails = (employee) => {
  return (
    <div>
      <p>
        <span className="font-bold">Employee Name:</span> {employee?.name}
      </p>
      <Message instructionMessage="This is the page that you can assign the timesheet for your employee" />
    </div>
  );
};

const SupervisorPage = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [isShowTimesheetForm, setIsShowTimesheetForm] = useState(false);
  const [timesheetData, setTimesheetData] = useState(null);
  const [remainingHours, setRemainingHours] = useState();
  const [allocatedData, setAllocatedData] = useState([]);
  const [isCompleteAllocation, setIsCompleteAllocation] = useState(false);
  useEffect(() => {
    const init = () => {
      const result = getEmployeeData(employeeId);
      setEmployee(result);
    };
    init();
  }, [employeeId]);
  const handleSubmitTimesheetData = async (value) => {
    const { isSuccess, res } = await calculateRemainingHours(value, true);
    if (!isSuccess) {
      notification({
        type: "error",
        message:
          "Your break time exceed the finish time, please input the break time again!",
      });
      return false;
    }
    const transformData = {
      paidBreak: res.paidBreak,
      unpaidBreak: res.unpaidBreak,
      isLegalBreak: res.isLegalBreak,
      remainingHours: res.remainingTime,
      actualTime: res.actualTime,
    };
    setTimesheetData(transformData);
    setRemainingHours(res.remainingTime);
    setIsShowTimesheetForm(true);
  };

  const handleCancel = () => {
    setIsShowTimesheetForm(false);
  };

  const handleSubmitAllocation = (value) => {
    if (remainingHours !== "00:00") {
      notification({
        type: "error",
        message:
          "You still have Remaning Hours, Please allocate all of your work",
      });
      return false;
    }
    setAllocatedData(value.items);
    setIsCompleteAllocation(true);
  };

  const handleSignout = () => {
    notification({
      type: "success",
      message: "Sign out Success",
    });
    navigate("/");
  };

  const propsAssignEmployeeTimesheetForm = {
    isShowTimesheetForm,
    isCompleteAllocation,
    onCancel: handleCancel,
    onFinish: handleSubmitTimesheetData,
  };
  const propsTimesheetAllocationForm = {
    remainingHours,
    actualTime: timesheetData?.actualTime,
    paidBreak: timesheetData?.paidBreak,
    unpaidBreak: timesheetData?.unpaidBreak,
    isLegalBreak: timesheetData?.isLegalBreak,
    onSubmit: handleSubmitAllocation,
    onSetRemaingHour: (value) => setRemainingHours(value),
  };

  return (
    <StyledDiv className="supervisor-page">
      {renderDetails(employee)}
      <AssignEmployeeTimesheetForm {...propsAssignEmployeeTimesheetForm} />
      {isShowTimesheetForm && !isCompleteAllocation && (
        <TimesheetAllocationForm {...propsTimesheetAllocationForm} />
      )}
      {allocatedData.length !== 0 && (
        <>
          <div className="mt-20">
            <AllocationData
              data={trasformSubmitAllocatedHours(allocatedData)}
            />
          </div>
          <div className="flex justify-center mb-10">
            <div className="mr-5">
              <Button
                type=""
                label="Approve another employee"
                onClick={() => navigate("/supervisor/select-employee")}
              />
            </div>
            <div>
              <Button
                type="primary"
                label="Sign out"
                onClick={() => handleSignout()}
              />
            </div>
          </div>
        </>
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.supervisor-page {
  }
`;

export default SupervisorPage;
