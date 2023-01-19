import * as userHelper from "helpers/user.helper";

export const transformAllUsersDataToTable = (data) => {
  return data.map((item, index) => userHelper.convertEachUserData(item, index));
};

export const convertEachUserData = (data, index) => {
  return {
    key: index, 
    name: data.name, 
    email: data.email
  };
};
