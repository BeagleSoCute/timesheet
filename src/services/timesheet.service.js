import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
//   const startDateTime = "2023-03-15 12:03";
//   const finishDateTime = "2023-03-15 13:37";
//   const breakTimeInMinutes = 15;

export const calculateRemainHours = (value) => {
  const { startDate, startTime, finishDate, finishTime, breaksTime } = value;
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
  previousSpent
) => {
  const [remainingHours, remainingMinutes] = remainingTime.split(":");
  const [currentSpentHours, currentSpentMinutes] = currentSpent.split(":");
  const [previousSpentHours, previousSpentMinutes] = previousSpent.split(":");
  // console.log("current", currentSpent);
  // console.log("previous", previousSpent);

  const remainingTimeInMillis =
    remainingHours * 60 * 60 * 1000 + remainingMinutes * 60 * 1000;

  const currentSpentInMillis =
    currentSpentHours * 60 * 60 * 1000 + currentSpentMinutes * 60 * 1000;

  const previousSpentInMillis =
    previousSpentHours * 60 * 60 * 1000 + previousSpentMinutes * 60 * 1000;

  const remainingTimeInMinutesAfterSubtraction =
    currentSpentInMillis < previousSpentInMillis
      ? remainingTimeInMillis + (previousSpentInMillis - currentSpentInMillis)
      : remainingTimeInMillis - currentSpentInMillis;
  // console.log("currentSpentInMillis", currentSpentInMillis);
  // console.log("previousSpentInMillis", previousSpentInMillis);

  const remainingTimeFormatted =
    remainingTimeInMinutesAfterSubtraction < 0
      ? "00:00"
      : dayjs
          .duration(remainingTimeInMinutesAfterSubtraction, "milliseconds")
          .format("HH:mm");

  // console.log(remainingTimeFormatted);
  return remainingTimeFormatted;
};
