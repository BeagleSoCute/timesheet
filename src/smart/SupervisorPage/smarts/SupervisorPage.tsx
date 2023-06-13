import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeData } from "services/employee.service";
import Message from "components/common/Message";
import AssignEmployeeTimesheetForm from "smart/SupervisorPage/components/AssignEmployeeTimesheetForm";
import TimesheetAllocationForm from "components/form/TimesheetAllocationForm";
import {
  calculateRemainingHoursPropsType,
  timesheetAllocationFormType,
} from "interface/index";
import {
  calculateRemainingHours,
  trasformSubmitAllocatedHours,
} from "services/timesheet.service";
import { notification } from "helpers/notification.helper";
import AllocationData from "components/common/AllocationData";
import Button from "components/common/Button";
import { employeeType, trasformSubmitAllocatedHoursPropsType } from "interface";
import { defaultTimesheetAllocationData } from "defaultValue";
import { timesheetAllocationDataType } from "contexts/types";

const renderDetails = (employee: employeeType) => {
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
  const [employee, setEmployee] = useState<employeeType>({ name: "", id: "" });
  const [isShowTimesheetForm, setIsShowTimesheetForm] = useState(false);
  const [timesheetData, setTimesheetData] =
    useState<timesheetAllocationDataType>(defaultTimesheetAllocationData);
  const [remainingHours, setRemainingHours] = useState<string>("");
  const [allocatedData, setAllocatedData] = useState<
    trasformSubmitAllocatedHoursPropsType[]
  >([]);
  const [isCompleteAllocation, setIsCompleteAllocation] = useState(false);
  useEffect(() => {
    const init = () => {
      if (employeeId) {
        const result = getEmployeeData(employeeId);
        if (result) {
          setEmployee(result);
        }
      }
    };
    init();
  }, [employeeId]);
  const handleSubmitTimesheetData = async (
    value: calculateRemainingHoursPropsType
  ) => {
    const { isSuccess, res } = await calculateRemainingHours(value);
    if (!isSuccess) {
      notification({
        type: "error",
        message:
          "Your break time exceed the finish time, please input the break time again!",
      });
      return false;
    }
    let transformData;
    if (res) {
      transformData = {
        paidBreak: res.paidBreak,
        unpaidBreak: res.unpaidBreak,
        isLegalBreak: res.isLegalBreak,
        remainingHours: res.remainingTime,
        actualTime: res.actualTime,
        defaultBreak: res.defaultBreak,
      };
      setTimesheetData(transformData);
      setRemainingHours(res ? res.remainingTime : "00");
      setIsShowTimesheetForm(true);
    } else {
      notification({
        type: "error",
        message: "There is an error in the system, Please try again later",
      });
    }
  };

  const handleCancel = () => {
    setIsShowTimesheetForm(false);
  };

  const handleSubmitAllocation = (value: timesheetAllocationFormType) => {
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
    actualTime: timesheetData.actualTime,
    paidBreak: timesheetData.paidBreak,
    unpaidBreak: timesheetData.unpaidBreak,
    isLegalBreak: timesheetData.isLegalBreak,
    defaultBreak: timesheetData.defaultBreak,
    onSubmit: handleSubmitAllocation,
    onSetRemaingHour: (value: string) => setRemainingHours(value),
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
