import dayjs from "dayjs";

export const preventSelectFinishTime = (startDate, finishDate, startTime) => {
  const startHour = dayjs(startTime).hour();
  const startMinute = dayjs(startTime).minute();
  if (dayjs(startDate).isSame(finishDate, "date")) {
    return {
      disabledHours: () => {
        const disabledHours = [];
        for (let i = 0; i < startHour; i++) {
          disabledHours.push(i);
        }
        return disabledHours;
      },
      disabledMinutes: (hour) => {
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
