import { loginAPI } from "../apis/auth.api";
import { notification } from "../helpers/notification.helper";
import { LoginRequest, LoginResolveResponse } from "../interface/api.interface";
import { AxiosResponse } from "axios";

export const login = async ({ userName, password }: LoginRequest) => {
  const res: AxiosResponse<LoginResolveResponse> = await loginAPI({
    userName,
    password,
  });
  const { success, payload } = res.data; // Access the response data
  console.log("success", success);
  console.log("payload", payload);

  if (success) {
    notification({ type: "success", message: "Login Success" });
    return true;
  } else {
    return false;
  }
};
