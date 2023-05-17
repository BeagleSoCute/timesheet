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

export const preventSelectExcessTime = (startDate, finishDate, currentTime) => {
  const startHour = dayjs(currentTime).hour();
  const startMinute = dayjs(currentTime).minute();
  if (dayjs(startDate).isSame(finishDate, "date")) {
    return {
      disabledHours: () => {
        const disabledHours = [];
        for (let i = startHour + 1; i < 24; i++) {
          disabledHours.push(i);
        }
        return disabledHours;
      },
      disabledMinutes: (hour) => {
        console.log(startMinute);
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
  startDate,
  finishDate,
  startTime,
  currentTime
) => {
  const startHour = dayjs(startTime).hour();
  const startMinute = dayjs(startTime).minute();
  const currentHour = dayjs(currentTime).hour();
  const currentMinute = dayjs(currentTime).minute();
  if (dayjs(startDate).isSame(finishDate, "date")) {
    return {
      disabledHours: () => {
        const disabledHours = [];
        for (let i = 0; i < startHour; i++) {
          disabledHours.push(i);
        }
        for (let i = currentHour + 1; i < 24; i++) {
          disabledHours.push(i);
        }
        return disabledHours;
      },
      disabledMinutes: (hour) => {
        const disabledMinutes = [];
        if (hour === startHour) {
          for (let i = 0; i <= startMinute; i++) {
            disabledMinutes.push(i);
          }
        }
        if (hour === currentHour) {
          for (let i = currentMinute; i < 60; i++) {
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
