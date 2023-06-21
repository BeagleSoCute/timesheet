import { loginAPI } from "../apis/auth.api";
import { notification } from "../helpers/notification.helper";
import { LoginRequest, LoginResolveResponse } from "../interface/api.interface";

export const login = async ({ userName, password }: LoginRequest) => {
  const { success, payload }: LoginResolveResponse = await loginAPI({
    userName,
    password,
  });
  console.log("success", success);
  console.log("payload", payload);

  if (success) {
    notification({ type: "success", message: "Login Success" });
    localStorage.setItem("userName", userName);
    localStorage.setItem("password", password);
  } else {
    notification({ type: "error", message: "Login Fail, Please try again!" });
  }
  return { success, payload };
};
