import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
//   const startDateTime = "2023-03-15 12:03";
//   const finishDateTime = "2023-03-15 13:37";
//   const breakTimeInMinutes = 15;

export const calculateRemainHours = (value) => {
  const { startDate, startTime, finishDate, finishTime, breaksTime, test } =
    value;
  console.log("testttt", test);

  const startDateTime = dayjs(startDate + " " + startTime, "DD-MM-YYYY HH:mm");
  const finishDateTime = dayjs(
    finishDate + " " + finishTime,
    "DD-MM-YYYY HH:mm"
  );

  const breakTimeInMinutes = breaksTime;

  const timeDiffInMs = finishDateTime.diff(startDateTime);
  const breakTimeInMs = breakTimeInMinutes * 60 * 1000;

  const remainingTimeInMs = timeDiffInMs - breakTimeInMs;
  const remainingHours = Math.floor(
    dayjs.duration(remainingTimeInMs).as("hours")
  );
  //   const remainingMinutes = dayjs.duration(remainingTimeInMs).as("minutes") % 60;

  const remainingTime = dayjs.duration(remainingTimeInMs).format("HH:mm");
  console.log(`Remaining time: ${remainingTime}`);

  return remainingTime;
};

export const calRemainFromLabourHour = (remainingTime, timeSpent) => {
  console.log("remainingTime", remainingTime);
  console.log("timeSpent", timeSpent);

  const [remainingHours, remainingMinutes] = remainingTime.split(":");
  const remainingTimeInMillis =
    remainingHours * 60 * 60 * 1000 + remainingMinutes * 60 * 1000;

  const [timeSpentHours, timeSpentMinutes] = timeSpent.split(":");
  const timeSpentInMillis =
    timeSpentHours * 60 * 60 * 1000 + timeSpentMinutes * 60 * 1000;

  const remainingTimeInMinutesAfterSubtraction =
    remainingTimeInMillis - timeSpentInMillis;

  const remainingTimeFormatted =
    remainingTimeInMinutesAfterSubtraction < 0
      ? "00:00"
      : dayjs
          .duration(remainingTimeInMinutesAfterSubtraction, "milliseconds")
          .format("HH:mm");

  console.log(remainingTimeFormatted);
  return remainingTimeFormatted;
};
