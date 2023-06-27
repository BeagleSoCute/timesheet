import { apiInstance } from "../configs/axios.config";
import { LoginRequest, LoginResolveResponse } from "../interface/api.interface";

export const loginAPI = async ({
  userName,
  password,
}: LoginRequest): Promise<LoginResolveResponse> => {
  const res: LoginResolveResponse = await apiInstance.post(
    "https://clements-timesheet-be.azurewebsites.net/api/v1/login",
    {
      user_code: userName,
      password: password,
    }
  );
  return res;
};
