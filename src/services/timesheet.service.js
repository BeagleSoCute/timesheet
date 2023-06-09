import { timeFormat } from "constants/format";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
//   const startDateTime = "2023-03-15 12:03";
//   const finishDateTime = "2023-03-15 13:37";
//   const breakTimeInMinutes = 15;

export const calculateRemainHours = (value) => {
  const { startDate, startTime, finishDate, finishTime, breaksTime } = value;
  console.log("breaksTime", breaksTime);
  const startDateTime = dayjs(startDate + " " + startTime, "DD-MM-YYYY HH:mm");
  const finishDateTime = dayjs(
    finishDate + " " + finishTime,
    "DD-MM-YYYY HH:mm"
  );
  const breakTimeInMinutes = breaksTime;
  const timeDiffInMs = finishDateTime.diff(startDateTime);
  const breakTimeInMs = breakTimeInMinutes * 60 * 1000;
  const remainingTimeInMs = timeDiffInMs - breakTimeInMs;
  const finalRemainingTimeInMs = remainingTimeInMs > 0 ? remainingTimeInMs : 0;
  const remainingTime = dayjs.duration(finalRemainingTimeInMs).format("HH:mm");
  console.log(`Remaining time: ${remainingTime}`);
  return remainingTime;
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

  // console.log(remainingTimeFormatted);
  return remainingTimeFormatted;
};

export const arrayToString = (arr) => {
  return arr.join(", ");
};

export const trasformSubmitAllocatedHours = (value) => {
  return value.map((item, index) => {
    return {
      ...item,
      key: index,
      labourHours: dayjs(item.labourHours).format(timeFormat),
      supervisors: arrayToString(item.supervisors),
    };
  });
};
