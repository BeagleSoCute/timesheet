import dayjs from "dayjs";

export const defaultTimesheetData = {
  id: 0,
  user_code: "",
  work_date: "",
  start_time: "",
  sign_in_time: "",
  sign_in_latitude: 0,
  sign_in_longitude: 0,
  is_forgot_sign_in: false,
  end_time: "",
  sign_out_time: "",
  sign_out_latitude: 0,
  sign_out_longitude: 0,
  is_forgot_sign_out: false,
  standard_unpaid_break_time: 0,
  unpaid_break_time: 0,
  updated_ubt_reason: "",
  standard_paid_break_time: 0,
  paid_break_time: 0,
  updated_pbt_reason: "",
  job_allocations: [],
  status: 0,
  frontend_id: "",
};

export const defaultClockinData = {
  startDateTime: dayjs(),
  signinData: {},
};

export const defaultTimesheetAllocationData = {
  actualTime: "",
  remainingHours: "",
  paidBreak: 0,
  unpaidBreak: 0,
  isLegalBreak: false,
  defaultBreak: { paidBreak: 0, unpaidBreak: 0 },
};
export const defaultAfterCompleteAllocatedData = [];
