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

export const preventActualTime = (finishTime, startTime) => {
  const startHour = dayjs(startTime).hour();
  const startMinute = dayjs(startTime).minute();
  const finishHour = dayjs(finishTime).hour();
  const finishMiniute = dayjs(finishTime).minute();
  if (dayjs(startTime).isSame(finishTime, "date")) {
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
      disabledMinutes: (hour) => {
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
