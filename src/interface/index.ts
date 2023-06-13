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

export interface timesheetAllocationAfterCompleteDataType {
  description: string;
  job: string;
  lab: string;
  labourHours: Dayjs;
  previousLabourHour: Dayjs;
  remainingHours: string;
  supervisors: string[];
}

export interface timesheetAllocationFormType extends defaultPaidBreaekType {
  items: timesheetAllocationAfterCompleteDataType[];
  reason: string;
  reasonCode: string;
}

export interface calRemainFromLabourHourReturnType {
  value: string;
  isSuccess: boolean;
}

export interface signoutFormProps extends timeSheetType {
  isForgetSingout: boolean;
}

export interface signinFormProps {
  actualStartTime: Dayjs;
  isForgetSignin: boolean;
  job: string[];
  pin: number;
  startDate: Dayjs;
  startTime: Dayjs;
}

export interface timesheetPageFormType {
  breaksTime: number;
  startDateTime: Dayjs;
  finishDate: Dayjs;
  finishTime: Dayjs;
  finishDateTime: Dayjs;
  isTakenBreak: boolean;
  pin: number;
}

export interface disableDateTimeType {
  disabledHours: () => number[];
  disabledMinutes: (hour: number) => number[];
  disabledSeconds: () => never[];
}

export interface trasformSubmitAllocatedHoursPropsType
  extends timesheetAllocationAfterCompleteDataType {
  asset?: string;
}
