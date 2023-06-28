import {
  timesheetAllocationAfterCompleteDataType,
  defaultPaidBreaekType,
  signoutDataType,
} from "interface";
import { SigninRequest } from "interface/api.interface";
import { Dayjs } from "dayjs";

export interface signinDataType {
  startDateTime: Dayjs;
  signinData: any;
}

export interface timeSheetType {
  id: number;
  user_code: string;
  work_date: string;
  start_time: string;
  sign_in_time: string;
  sign_in_latitude: number;
  sign_in_longitude: number;
  is_forgot_sign_in: boolean;
  end_time: string;
  sign_out_time: string;
  sign_out_latitude: number;
  sign_out_longitude: number;
  is_forgot_sign_out: boolean;
  standard_unpaid_break_time: number;
  unpaid_break_time: number;
  updated_ubt_reason: string;
  standard_paid_break_time: number;
  paid_break_time: number;
  updated_pbt_reason: string;
  job_allocations: any;
  status: number;
  frontend_id: string;
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
  clockinData: Dayjs;
  timesheetData: timeSheetType;
  allocatedData: timesheetAllocationAfterCompleteDataType[];
  timesheetAllocationData: timesheetAllocationDataType;
  jobLists: [];
  userData: {};
  signoutData: signoutDataType | null;
  signoutTime: Dayjs | null;
}
