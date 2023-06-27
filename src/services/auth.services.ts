import { loginAPI } from "../apis/auth.api";
import { notification } from "../helpers/notification.helper";
import { LoginRequest, LoginResolveResponse } from "../interface/api.interface";
import { setObjectToLocalStorage } from "../helpers/localstorage.helper";

export const login = async ({ userName, password }: LoginRequest) => {
  const { success, payload }: LoginResolveResponse = await loginAPI({
    userName,
    password,
  });

  if (success) {
    notification({ type: "success", message: "Login Success" });
    setObjectToLocalStorage("defaultLogin", { userName, password });
    setObjectToLocalStorage("userData", payload);
  } else {
    notification({ type: "error", message: "Login Fail, Please try again!" });
  }
  return { success, payload };
};
