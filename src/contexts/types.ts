import { defaultPaidBreaekType } from "interface";
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
interface timesheetAllocationDataType {
  actualTime: string;
  remainingHours: string;
  paidBreak: number;
  unpaidBreak: number;
  isLegalBreak: boolean;
  defaultBreak: defaultPaidBreaekType;
}
export interface ReducerType {
  loading: boolean;
  isAuth: boolean;
  signinData: signinDataType;
  timesheetData: timeSheetType;
  allocatedData: Array<object>;
  timesheetAllocationData: timesheetAllocationDataType;
}
