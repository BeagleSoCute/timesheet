import { Dayjs } from "dayjs";

export const defaultTimesheetData = {
  pin: 0,
  startDateTime: Dayjs,
  job: [""],
  finishDate: Dayjs,
  finishTime: Dayjs,
};

export const defaultSigninData = {
  pin: 0,
  startDateTime: Dayjs,
  job: [""],
};

export const defaultTimesheetAllocationData = {
  actualTime: "",
  remainingHours: "",
  paidBreak: 0,
  unpaidBreak: 0,
  isLegalBreak: false,
  defaultBreak: { paidBreak: 0, unpaidBreak: 0 },
};
