import { getUserData } from "apis/user.api";
import { setItem } from "services/localStorage.service";

export const getMyData = async () => {
  try {
    const res = await getUserData();
    setItem("token", res.payload);
    console.log("res from getUserData is ", res);
    console.log("");
  } catch (error) {
    console.log("error", error);
  }
};

export const getAllUsers = async () => {
  // console.log("getUsers work");
  // const res = await getUsers();
  // console.log("results are ", res);
};
