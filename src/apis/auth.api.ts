import { apiInstance } from "../configs/axios.config";
import { AxiosResponse } from "axios";
import { LoginRequest, LoginResolveResponse } from "../interface/api.interface";

export const loginAPI = ({
  userName,
  password,
}: LoginRequest): Promise<AxiosResponse<LoginResolveResponse>> =>
  apiInstance.post<LoginResolveResponse>(
    "http://192.168.69.21:8080/api/v1/login",
    {
      user_code: userName,
      password: password,
    }
  );
