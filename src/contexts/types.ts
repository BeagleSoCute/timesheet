import { defaultPaidBreaekType } from "interface";
import { Dayjs } from "dayjs";

export interface signinDataType {
  pin: number;
  startDateTime: object;
  job: string[];
}

interface timeSheetType {
  pin: number;
  startDateTime: object;
  job: string[];
  finishDate: object;
  finishTime: object;
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
