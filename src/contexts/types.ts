import {
  timesheetAllocationAfterCompleteDataType,
  defaultPaidBreaekType,
} from "interface";
import { Dayjs } from "dayjs";

export interface signinDataType {
  pin: number;
  startDateTime: Dayjs;
  job: string[];
}

export interface timeSheetType {
  pin: number;
  startDateTime: Dayjs;
  job: string[];
  finishDate: Dayjs;
  finishTime: Dayjs;
}
export interface timesheetAllocationDataType extends defaultPaidBreaekType {
  actualTime: string;
  remainingHours: string;
  // unpaidBreak: number;
  isLegalBreak: boolean;
  defaultBreak: { paidBreak: number; unpaidBreak: number };
}
export interface ReducerType {
  loading: boolean;
  isAuth: boolean;
  signinData: signinDataType;
  timesheetData: timeSheetType;
  allocatedData: timesheetAllocationAfterCompleteDataType[];
  timesheetAllocationData: timesheetAllocationDataType;
  jobLists: [];
}
