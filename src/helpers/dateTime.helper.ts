import dayjs, { Dayjs } from "dayjs";

export const preventSelectFinishTime = (
  startDate: Dayjs,
  finishDate: Dayjs,
  startTime: Dayjs
) => {
  const startHour: number = dayjs(startTime).hour();
  const startMinute: number = dayjs(startTime).minute();
  if (dayjs(startDate).isSame(finishDate, "date")) {
    return {
      disabledHours: () => {
        const disabledHours = [];
        for (let i = 0; i < startHour; i++) {
          disabledHours.push(i);
        }
        return disabledHours;
      },
      disabledMinutes: (hour: number) => {
        if (hour === startHour) {
          const disabledMinutes = [];
          for (let i = 0; i <= startMinute; i++) {
            disabledMinutes.push(i);
          }
          return disabledMinutes;
        } else {
          return [];
        }
      },
      disabledSeconds: () => [],
    };
  } else {
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    };
  }
};

export const preventSelectExcessTime = (
  startDate: Dayjs,
  finishDate: Dayjs,
  currentTime: Dayjs
) => {
  const startHour: number = dayjs(currentTime).hour();
  const startMinute: number = dayjs(currentTime).minute();
  if (dayjs(startDate).isSame(finishDate, "date")) {
    return {
      disabledHours: () => {
        const disabledHours = [];
        for (let i = startHour + 1; i < 24; i++) {
          disabledHours.push(i);
        }
        return disabledHours;
      },
      disabledMinutes: (hour: number) => {
        if (hour === startHour) {
          const disabledMinutes = [];
          for (let i = startMinute; i < 60; i++) {
            disabledMinutes.push(i);
          }
          return disabledMinutes;
        } else {
          return [];
        }
      },
      disabledSeconds: () => [],
    };
  } else {
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    };
  }
};

export const preventActualTime = (
  finishDate: Dayjs,
  finishTime: Dayjs,
  startDateTime: Dayjs
) => {
  const startHour = dayjs(startDateTime).hour();
  const startMinute = dayjs(startDateTime).minute();
  const finishHour = dayjs(finishTime).hour();
  const finishMiniute = dayjs(finishTime).minute();
  if (dayjs(startDateTime).isSame(finishDate, "date")) {
    return {
      disabledHours: () => {
        const disabledHours = [];
        for (let i = 0; i < startHour; i++) {
          disabledHours.push(i);
        }
        for (let i = finishHour + 1; i < 24; i++) {
          disabledHours.push(i);
        }
        return disabledHours;
      },
      disabledMinutes: (hour: number) => {
        const disabledMinutes = [];
        if (hour === startHour) {
          for (let i = 0; i <= startMinute; i++) {
            disabledMinutes.push(i);
          }
          return disabledMinutes;
        }
        if (hour === finishHour) {
          for (let i = finishMiniute; i < 60; i++) {
            disabledMinutes.push(i);
          }
          return disabledMinutes;
        } else {
          return [];
        }
      },
      disabledSeconds: () => [],
    };
  } else {
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    };
  }
};

export const mergeDateAndTime = (thisDate: Dayjs, thisTime: Dayjs): Dayjs => {
  // Extract the date component from 'finishDate'
  const date = thisDate.format("YYYY-MM-DD");
  // Extract the time component from 'finishTime'
  const time = thisTime.format("HH:mm:ss");
  // Merge the date and time components into a new Day.js object
  const finishDateTime = dayjs(date + " " + time, "YYYY-MM-DD HH:mm:ss");
  return finishDateTime;
};

export const mergeEndDateAndTime = (
  date: string | undefined,
  time: string | undefined
): Dayjs => {
  const finishDateTime = dayjs(date + " " + time, "YYYY-MM-DD HH:mm:ss");
  return finishDateTime;
};
