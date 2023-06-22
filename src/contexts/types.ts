import {
  timesheetAllocationAfterCompleteDataType,
  defaultPaidBreaekType,
} from "interface";
import { SigninRequest } from "interface/api.interface";
import { Dayjs } from "dayjs";

export interface signinDataType {
  startDateTime: Dayjs;
  signinData: any;
}

export interface timeSheetType {
  startDateTime: Dayjs;
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
  actionAPIData: SigninRequest | null;
  clockinData: signinDataType;
  timesheetData: timeSheetType;
  allocatedData: timesheetAllocationAfterCompleteDataType[];
  timesheetAllocationData: timesheetAllocationDataType;
  jobLists: [];
  userData: {};
}
