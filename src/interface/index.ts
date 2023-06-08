import { Dayjs } from "dayjs";
import { timeSheetType } from "contexts/types";

export interface calculateRemainingHoursPropsType {
  startDateTime: Dayjs;
  breaksTime: number;
  finishDateTime: Dayjs;
}
export interface employeeType {
  id: string;
  name: string;
}
export interface defaultPaidBreaekType {
  paidBreak: number;
  unpaidBreak: number;
}

export interface timesheetAllocationDataType {
  description: string;
  job: string;
  lab: string;
  labourHours: Dayjs;
  previousLabourHour: Dayjs;
  remainingHours: string;
  supervisors: string[];
}

export interface timesheetAllocationFormType {
  items: timesheetAllocationDataType[];
  paidBreak: number;
  reason: string;
  reasonCode: string;
  unpaidBreak: number;
}

export interface calRemainFromLabourHourReturnType {
  value: string;
  isSuccess: boolean;
}

export interface handleSubmitSignoutValueProps extends timeSheetType {
  isForgetSingout: boolean;
}

export interface handleSubmitSigninValueProps {
  actualStartTime: Dayjs;
  isForgetSignin: boolean;
  job: string[];
  pin: number;
  startDate: Dayjs;
  startTime: Dayjs;
}
