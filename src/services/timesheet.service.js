import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { notification } from "helpers/notification.helper";

dayjs.extend(duration);

export const calculateRemainingHours = (value) => {
  const { startDateTime, breaksTime, finishDateTime } = value;
  const timeDiffInMs = finishDateTime.diff(startDateTime);
  const hours = Math.floor(timeDiffInMs / (60 * 60 * 1000));
  const minutes = Math.round((timeDiffInMs % (60 * 60 * 1000)) / (60 * 1000));
  const { paidBreak, unpaidBreak, isLegalBreak, defaultBreak } =
    transformBreakingTime(breaksTime, hours);
  const breakTimeInMs = (unpaidBreak + paidBreak) * 60 * 1000;
  const remainingTimeInMs = timeDiffInMs - breakTimeInMs;
  if (remainingTimeInMs < 0) {
    return { isSuccess: false };
  }
  const finalRemainingTimeInMs = remainingTimeInMs > 0 ? remainingTimeInMs : 0;
  const remainingHours = Math.floor(finalRemainingTimeInMs / (60 * 60 * 1000));
  const remainingMinutes = Math.round(
    (finalRemainingTimeInMs % (60 * 60 * 1000)) / (60 * 1000)
  );
  const remainingTime = `${padTime(remainingHours)}:${padTime(
    remainingMinutes
  )}`;
  const actualTime = `${padTime(hours)}:${padTime(minutes)}`;
  return {
    isSuccess: true,
    res: {
      remainingTime,
      workingHours: hours,
      actualTime,
      paidBreak,
      unpaidBreak,
      isLegalBreak,
      defaultBreak,
    },
  };
};
const padTime = (time) => {
  return time.toString().padStart(2, "0");
};

export const isValidBreakingTime = (
  remainingTime,
  totalBreakingTime,
  previousTotalBreakingTime
) => {
  const [remainingHours, remainingMinutes] = remainingTime.split(":");
  const remainingTimeInMillis =
    remainingHours * 60 * 60 * 1000 + remainingMinutes * 60 * 1000;
  const toltalBreakingTimeInMillis = totalBreakingTime * 60 * 1000;
  if (
    totalBreakingTime < previousTotalBreakingTime ||
    totalBreakingTime === previousTotalBreakingTime
  ) {
    return true;
  } else if (remainingTimeInMillis <= toltalBreakingTimeInMillis) {
    return false;
  } else {
    return true;
  }
};
export const calculateActualRemain = async (remainingTime, lastLabourHours) => {
  const labour = await dayjs(lastLabourHours).format("HH:mm");
  const [remainingHours, remainingMinutes] = remainingTime.split(":");
  const [labourHours, labourMinutes] = labour.split(":");
  const remainingTimeInMillis =
    remainingHours * 60 * 60 * 1000 + remainingMinutes * 60 * 1000;
  const LabourInMillis =
    labourHours * 60 * 60 * 1000 + labourMinutes * 60 * 1000;
  const result = remainingTimeInMillis - LabourInMillis;
  const finalResult = dayjs.duration(result, "milliseconds").format("HH:mm");
  if (remainingTimeInMillis < LabourInMillis) {
    return "00:00";
  }
  return finalResult;
};

export const calRemainFromLabourHour = (
  remainingTime,
  currentSpent,
  previousSpent,
  isReset
) => {
  const [remainingHours, remainingMinutes] = remainingTime.split(":");
  const [currentSpentHours, currentSpentMinutes] = currentSpent.split(":");
  const remainingTimeInMillis =
    remainingHours * 60 * 60 * 1000 + remainingMinutes * 60 * 1000;
  const currentSpentInMillis =
    currentSpentHours * 60 * 60 * 1000 + currentSpentMinutes * 60 * 1000;
  let remainingTimeInMinutesAfterSubtraction;
  if (previousSpent) {
    const [previousSpentHours, previousSpentMinutes] = previousSpent.split(":");
    const previousSpentInMillis =
      previousSpentHours &&
      previousSpentHours * 60 * 60 * 1000 + previousSpentMinutes * 60 * 1000;
    remainingTimeInMinutesAfterSubtraction =
      currentSpentInMillis < previousSpentInMillis
        ? remainingTimeInMillis + (previousSpentInMillis - currentSpentInMillis)
        : remainingTimeInMillis -
          (currentSpentInMillis - previousSpentInMillis);
  } else if (isReset === true) {
    remainingTimeInMinutesAfterSubtraction =
      remainingTimeInMillis + currentSpentInMillis;
  } else {
    remainingTimeInMinutesAfterSubtraction =
      remainingTimeInMillis - currentSpentInMillis;
  }
  const remainingTimeFormatted =
    remainingTimeInMinutesAfterSubtraction < 0
      ? { value: "00:00", isSuccess: false }
      : {
          value: dayjs
            .duration(remainingTimeInMinutesAfterSubtraction, "milliseconds")
            .format("HH:mm"),
          isSuccess: true,
        };
  return remainingTimeFormatted;
};

export const arrayToString = (arr) => {
  return arr.join(", ");
};

export const trasformSubmitAllocatedHours = (value) => {
  return value.map((item, index) => {
    const formattedHours =
      dayjs(item.labourHours).minute() === 0
        ? dayjs(item.labourHours).format("H")
        : dayjs(item.labourHours).format("H.mm");
    return {
      ...item,
      key: index,
      labourHours: formattedHours,
      supervisors: arrayToString(item.supervisors),
    };
  });
};

export const transformBreakingTime = (totalBreak, totalHours) => {
  const hours = totalHours;
  if (hours >= 8) {
    const legal = 50;
    return {
      paidBreak: 20,
      unpaidBreak: totalBreak < legal ? 30 : totalBreak - 20,
      isLegalBreak: totalBreak < legal ? false : true,
      defaultBreak: { paidBreak: 20, unpaidBreak: 30 },
    };
  } else {
    const legal = 40;
    return {
      paidBreak: 10,
      unpaidBreak: totalBreak < legal ? 30 : totalBreak - 10,
      isLegalBreak: totalBreak < legal ? false : true,
      defaultBreak: { paidBreak: 10, unpaidBreak: 30 },
    };
  }
};

export const calculateNewRemainingTime = (remainingHours, totalBreak) => {
  // Parse the remainingHours string into hours and minutes
  const [hours, minutes] = remainingHours.split(":").map(Number);
  // Create a duration object using hours and minutes
  const remainingDuration = dayjs.duration({ hours, minutes });

  // Subtract the breakTime (in minutes) from the remainingDuration
  const newRemainingDuration = remainingDuration.subtract(
    totalBreak,
    "minutes"
  );
  if (newRemainingDuration.asMinutes() < 0) {
    return "00:00";
  }

  // Format the new remaining time into "HH:mm" format
  const newRemainingTime = `${newRemainingDuration
    .hours()
    .toString()
    .padStart(2, "0")}:${newRemainingDuration
    .minutes()
    .toString()
    .padStart(2, "0")}`;
  return newRemainingTime;
};

export const transformTimeToMs = (time) => {
  const [hours, minutes] = time.split(":");
  const timeInMs = hours * 60 * 60 * 1000 + minutes * 60 * 1000;
  return timeInMs;
};

//Functions below are functions on the TimesheetForm (Backup)

export const handleErrorSelectFinishime = (current, form) => {
  const startDate = form.getFieldValue("startDateTime");
  const finishDate = form.getFieldValue("finishDate");
  const startTime = form.getFieldValue("startDateTime");
  const startHour = dayjs(startTime).hour();
  const startMinute = dayjs(startTime).minute();
  const finishHour = dayjs(current).hour();
  const finishMinute = dayjs(current).minute();
  if (
    dayjs(startDate).isSame(finishDate, "date") &&
    startHour === finishHour &&
    startMinute >= finishMinute
  ) {
    notification({
      type: "error",
      message: "Finish time must be greater than start time",
    });
    form.resetFields(["finishTime"]);
  }
};

export const handleDisabledEndDate = (current, form) => {
  const startDateTime = form.getFieldValue("startDateTime");
  return current && current.isBefore(dayjs(startDateTime).endOf("day"), "day");
};

export const handleDisabledStartDate = (current, form) => {
  const finishDate = form.getFieldValue("finishDate");
  return current && current.isAfter(dayjs(finishDate).endOf("day"), "day");
};
