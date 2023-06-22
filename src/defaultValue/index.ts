import dayjs from "dayjs";

export const defaultTimesheetData = {
  pin: 0,
  startDateTime: dayjs(),
  job: [""],
  finishDate: dayjs(),
  finishTime: dayjs(),
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
