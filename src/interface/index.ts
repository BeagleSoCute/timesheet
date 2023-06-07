import { Dayjs } from "dayjs";

export interface calculateRemainingHoursPropsType {
  startDateTime: any;
  breaksTime: number;
  finishDateTime: any;
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
  labourHours: Dayjs | null;
  previousLabourHour: Dayjs | null;
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
