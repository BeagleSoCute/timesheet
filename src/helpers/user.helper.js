import * as userHelper from "helpers/user.helper";
import { calRemainFromLabourHour } from "services/timesheet.service";

export const transformAllUsersDataToTable = (data) => {
  return data.map((item, index) => userHelper.convertEachUserData(item, index));
};

export const convertEachUserData = (data, index) => {
  return {
    key: index,
    id: data._id,
    name: data.name,
    email: data.email,
  };
};
