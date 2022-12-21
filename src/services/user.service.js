import { getUserApi } from "apis/user.api";

export const getMyData = async () => {
    const res = await getUserApi();
    return {success:res.success,userData:res.payload}
};

export const getAllUsers = async () => {
  // console.log("getUsers work");
  // const res = await getUsers();
  // console.log("results are ", res);
};
