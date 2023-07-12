import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import {
  calculateRemainingHoursPropsType,
  calRemainFromLabourHourReturnType,
  trasformSubmitAllocatedHoursPropsType,
} from "interface";
dayjs.extend(duration);

interface calculateRemainingHoursReturnType {
  isSuccess: boolean;
  res:
    | {
        remainingTime: string;
        workingHours: number;
        actualTime: string;
        paidBreak: number;
        unpaidBreak: number;
        isLegalBreak: boolean;
        defaultBreak: { paidBreak: number; unpaidBreak: number };
      }
    | undefined;
}
export const calculateRemainingHours = (
  value: calculateRemainingHoursPropsType
): calculateRemainingHoursReturnType => {
  const { startDateTime, breaksTime, finishDateTime } = value;
  const timeDiffInMs = finishDateTime.diff(startDateTime);
  const hours = Math.floor(timeDiffInMs / (60 * 60 * 1000));
  const minutes = Math.floor((timeDiffInMs % (60 * 60 * 1000)) / (60 * 1000));
  const { paidBreak, unpaidBreak, isLegalBreak, defaultBreak } =
    transformBreakingTime(breaksTime, hours);
  const breakTimeInMs = (unpaidBreak + paidBreak) * 60 * 1000;
  const remainingTimeInMs = timeDiffInMs - breakTimeInMs;
  if (remainingTimeInMs < 0) {
    return { isSuccess: false, res: undefined };
  }
  const finalRemainingTimeInMs = remainingTimeInMs > 0 ? remainingTimeInMs : 0;
  const remainingHours = Math.floor(finalRemainingTimeInMs / (60 * 60 * 1000));
  const remainingMinutes = Math.floor(
    (finalRemainingTimeInMs % (60 * 60 * 1000)) / (60 * 1000)
  );
  const remainingTime = `${padTime(remainingHours.toString())}:${padTime(
    remainingMinutes.toString()
  )}`;
  const actualTime = `${padTime(hours.toString())}:${padTime(
    minutes.toString()
  )}`;
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
const padTime = (time: string) => {
  return time.toString().padStart(2, "0");
};

export const isValidBreakingTime = (
  remainingTime: string,
  totalBreakingTime: number,
  previousTotalBreakingTime: number
): boolean => {
  const [remainingHours, remainingMinutes] = remainingTime.split(":");
  const remainingTimeInMillis =
    parseInt(remainingHours) * 60 * 60 * 1000 +
    parseInt(remainingMinutes) * 60 * 1000;
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
export const calculateActualRemain = async (
  remainingTime: string,
  lastLabourHours: Dayjs
) => {
  const labour: string = await dayjs(lastLabourHours).format("HH:mm");
  const [remainingHours, remainingMinutes] = remainingTime.split(":");
  const [labourHours, labourMinutes] = labour.split(":");
  const remainingTimeInMillis =
    parseInt(remainingHours) * 60 * 60 * 1000 +
    parseInt(remainingMinutes) * 60 * 1000;
  const LabourInMillis =
    parseInt(labourHours) * 60 * 60 * 1000 +
    parseInt(labourMinutes) * 60 * 1000;
  const result = remainingTimeInMillis - LabourInMillis;
  const finalResult = dayjs.duration(result, "milliseconds").format("HH:mm");
  if (remainingTimeInMillis < LabourInMillis) {
    return "00:00";
  }
  return finalResult;
};

export const calRemainFromLabourHour = (
  remainingTime: string,
  currentSpent: string,
  previousSpent?: string,
  isReset?: boolean
): calRemainFromLabourHourReturnType => {
  const [remainingHours, remainingMinutes] = remainingTime.split(":");
  const [currentSpentHours, currentSpentMinutes] = currentSpent.split(":");
  const remainingTimeInMillis =
    parseInt(remainingHours) * 60 * 60 * 1000 +
    parseInt(remainingMinutes) * 60 * 1000;
  const currentSpentInMillis =
    parseInt(currentSpentHours) * 60 * 60 * 1000 +
    parseInt(currentSpentMinutes) * 60 * 1000;
  let remainingTimeInMinutesAfterSubtraction;
  if (previousSpent) {
    const [previousSpentHours, previousSpentMinutes] = previousSpent.split(":");
    const previousSpentInMillis =
      // previousSpentHours &&
      parseInt(previousSpentHours) * 60 * 60 * 1000 +
      parseInt(previousSpentMinutes) * 60 * 1000;
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

export const arrayToString = (arr: string[]): string => {
  return arr.join(", ");
};

interface trasformSubmitAllocatedHoursReturnType {
  job: string;
  supervisors: string;
  lab: string;
  asset: string;
  labourHours: string;
}
export const trasformSubmitAllocatedHours = (
  value: trasformSubmitAllocatedHoursPropsType[]
): trasformSubmitAllocatedHoursReturnType[] => {
  return value.map(
    (item: trasformSubmitAllocatedHoursPropsType, index: number) => {
      const formattedHours =
        dayjs(item.labourHours).minute() === 0
          ? dayjs(item.labourHours).format("H")
          : dayjs(item.labourHours).format("H.mm");
      return {
        ...item,
        //key: index,
        lab: item.lab,
        asset: item.asset ? item.asset : "",
        labourHours: formattedHours,
        // supervisors: arrayToString(item.supervisors),
        supervisors: item.supervisors,
      };
    }
  );
};
interface transformBreakingTimeReturnType {
  paidBreak: number;
  unpaidBreak: number;
  isLegalBreak: boolean;
  defaultBreak: { paidBreak: number; unpaidBreak: number };
}
export const transformBreakingTime = (
  totalBreak: number,
  totalHours: number
): transformBreakingTimeReturnType => {
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

export const calculateNewRemainingTime = (
  remainingHours: string,
  totalBreak: number
): string => {
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

export const transformTimeToMs = (time: string): number => {
  const [hours, minutes] = time.split(":");
  const timeInMs =
    parseInt(hours) * 60 * 60 * 1000 + parseInt(minutes) * 60 * 1000;
  return timeInMs;
};
