import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getEmployeeData } from "services/employee.service";
import Message from "components/common/Message";
import AssignEmployeeTimesheetForm from "components/form/AssignEmployeeTimesheetForm";
import TimesheetAllocationForm from "components/form/TimesheetAllocationForm";
import { calculateRemainingHours } from "services/timesheet.service";
import { notification } from "helpers/notification.helper";
import dayjs from "dayjs";
import { dateFormat, timeFormat } from "constants/format";

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
  const [employee, setEmployee] = useState(null);
  const [isShowTimesheetForm, setIsShowTimesheetForm] = useState(false);
  const [timesheetData, setTimesheetData] = useState(null);
  const [remainingHours, setRemainingHours] = useState();
  useEffect(() => {
    const init = () => {
      const result = getEmployeeData(employeeId);
      setEmployee(result);
    };
    init();
  }, []);
  const handleSubmit = async (value) => {
    const { isSuccess, res } = await calculateRemainingHours(value, true);
    if (!isSuccess) {
      notification({
        type: "error",
        message:
          "Your break time exceed the finish time, please input the break time again!",
      });
      // form.resetFields(["breaksTime"]);
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

  const handleSubmitAllocation = (value) => {};

  const propsAssignEmployeeTimesheetForm = {
    isShowTimesheetForm,
    onCancel: handleCancel,
    onFinish: handleSubmit,
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
      {isShowTimesheetForm && (
        <TimesheetAllocationForm {...propsTimesheetAllocationForm} />
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.supervisor-page {
  }
`;

export default SupervisorPage;
