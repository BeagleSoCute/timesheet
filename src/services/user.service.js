import { getUserApi, getAllUsersApi, getUserDetailsApi } from "apis/user.api";

export const getMyData = async () => {
  const res = await getUserApi();
  return { success: res.success, userData: res.payload };
};

export const getAllUsers = async () => {
  const res = await getAllUsersApi();
  return { success: res.success, allUsersData: res.payload };
};

export const getUserDetails = async (id) => {
  const { success, payload: details } = await getUserDetailsApi(id);
  return { success, details };
};
