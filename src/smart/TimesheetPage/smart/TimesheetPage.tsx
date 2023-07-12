import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/app.context";
import TimesheetForm from "smart/TimesheetPage/components/TimesheetForm";
import AllocationData from "components/common/AllocationData";
import { mergeEndDateAndTime, convertTimeToNum } from "helpers/dateTime.helper";
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
import { signout } from "services/timesheetAPI.service";
import { handleRetriveLocationData } from "helpers/location.helper";

const TimesheetPage = () => {
  const [form] = Form.useForm() as [FormInstance<timesheetPageFormType>];

  const navigate = useNavigate();
  const {
    timesheetData,
    allocatedData,
    signoutData,
    signoutTime,
    breakingData,
    timesheetAllocationData,
    setSignoutData,
    clearTimesheetData,
    setSignoutTime,
    setTimesheetAllocationData,
  } = useContext(AppContext);

  useEffect(() => {
    if (!signoutTime) {
      setSignoutTime(dayjs());
    }
    //popup perrmission
    navigator.geolocation.getCurrentPosition(() => {});
  }, []);
  const handleSubmit = async (value: signoutDataType) => {
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
  const handleSignout = async () => {
    const { isSuccessRetrivedLocation, latitude, longitude } =
      await handleRetriveLocationData();
    if (!isSuccessRetrivedLocation) {
      notification({
        type: "error",
        message:
          "Can not singin into the system, please allow the permission to access the location on your browser setting!",
      });
      return;
    }
    if (!signoutData) {
      notification({
        type: "error",
        message: "There is not signout data, please contact the admin!",
      });
      return;
    }
    //ANCHOR handleSignout and submit the job allocation data
    const { defaultBreak } = timesheetAllocationData;
    const {
      id,
      work_date,
      start_time,
      sign_in_time,
      sign_in_latitude,
      sign_in_longitude,
      is_forgot_sign_in,
      frontend_id,
      job_allocations,
    } = timesheetData;
    const signinData = {
      id,
      work_date,
      start_time,
      sign_in_time,
      sign_in_latitude,
      sign_in_longitude,
      is_forgot_sign_in,
      frontend_id,
    };

    const jobAllocationLists = allocatedData.map((item: any) => {
      return {
        job_type: item.workType,
        job_code: item.job,
        asset_code: item.asset,
        cost_centre_code: item.costCenter,
        supervisor: item.supervisors,
        description: item.description,
        hours: convertTimeToNum(item.remainingHours),
      };
    });
    const data = {
      signinData,
      signoutData,
      breakingData,
      signoutLatitude: latitude,
      singoutLongitude: longitude,
      defaultBreak,
      jobAllocationLists,
    };
    const { success } = await signout(data);
    if (success) {
      notification({
        type: "success",
        message: "Sign out Success",
      });
      clearTimesheetData();
      navigate("/");
    } else {
      notification({
        type: "error",
        message: "Sign out fail, Please contact admin!",
      });
    }
  };
  const propsTimesheetForm = {
    form,
    signoutData,
    startDateTime: mergeEndDateAndTime(
      timesheetData.work_date,
      timesheetData.start_time
    ),
    signoutTime,
    isHasJobAllocation: timesheetData.job_allocations.length > 0 ? true : false,
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
