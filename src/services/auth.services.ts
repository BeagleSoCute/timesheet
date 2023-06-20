import { loginAPI } from "../apis/auth.api";
import { notification } from "../helpers/notification.helper";
import { LoginRequest, LoginResolveResponse } from "../interface/api.interface";
import { AxiosResponse } from "axios";

export const login = async ({ userName, password }: LoginRequest) => {
  const { success, payload }: LoginResolveResponse = await loginAPI({
    userName,
    password,
  });
  console.log("success", success);
  console.log("payload", payload);
  if (success) {
    notification({ type: "success", message: "Login Success" });
    return true;
  } else {
    return false;
  }
};
