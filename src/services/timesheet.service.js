import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export const calculateRemainingHours = (value) => {
  const { startDateTime, finishDate, finishTime, breaksTime } = value;
  const startDate = dayjs(startDateTime, "DD-MM-YYYY HH:mm");
  const finishDateTime = dayjs(
    finishDate + " " + finishTime,
    "DD-MM-YYYY HH:mm"
  );
  let breakTimeInMinutes; //NOTE default here based on the legal break time
  const timeDiffInMs = finishDateTime.diff(startDate);
  const hours = Math.floor(timeDiffInMs / (60 * 60 * 1000));
  //NOTE set default for break time if not provided and check the deault legal break time
  if (breaksTime === 0) {
    const legalBreakingTime = hours >= 8 ? 50 : hours >= 6 ? 40 : 0;
    breakTimeInMinutes = legalBreakingTime;
  } else {
    breakTimeInMinutes = breaksTime;
  }

  const breakTimeInMs = breakTimeInMinutes * 60 * 1000;

  const remainingTimeInMs = timeDiffInMs - breakTimeInMs;
  if (remainingTimeInMs < 0) {
    return { isSuccess: false };
  }
  const finalRemainingTimeInMs = remainingTimeInMs > 0 ? remainingTimeInMs : 0;
  const remainingHours = Math.floor(finalRemainingTimeInMs / (60 * 60 * 1000));
  const remainingMinutes = Math.floor(
    (finalRemainingTimeInMs % (60 * 60 * 1000)) / (60 * 1000)
  );
  const remainingTime = `${padTime(remainingHours)}:${padTime(
    remainingMinutes
  )}`;
  return {
    isSuccess: true,
    res: { remainingTime, breakTime: breakTimeInMinutes, workingHours: hours },
  };
};
const padTime = (time) => {
  return time.toString().padStart(2, "0");
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
      ? { value: 0, isSuccess: false }
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
      unpaidBreak: totalBreak - 20,
      isLegalBreak: totalBreak < legal ? false : true,
    };
  } else if (hours >= 6) {
    const legal = 40;
    return {
      paidBreak: 10,
      unpaidBreak: totalBreak - 10,
      isLegalBreak: totalBreak < legal ? false : true,
    };
  } else {
    return {
      paidBreak: 0,
      unpaidBreak: totalBreak,
      isLegalBreak: false,
    };
  }
};

export const calculateNewRemainingTime = (remainingHours, totalBreak) => {
  // console.log("totalBreak", totalBreak);
  // console.log("remainingHours", remainingHours);

  // Parse the remainingHours string into hours and minutes
  const [hours, minutes] = remainingHours.split(":").map(Number);

  // Create a duration object using hours and minutes
  const remainingDuration = dayjs.duration({ hours, minutes });

  // Subtract the breakTime (in minutes) from the remainingDuration
  const newRemainingDuration = remainingDuration.subtract(
    totalBreak,
    "minutes"
  );
  // console.log("remainingDuration", remainingDuration);
  // console.log("newRemainingDuration", newRemainingDuration);

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
