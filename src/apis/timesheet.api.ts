import { apiInstance } from "../configs/axios.config";
import { SigninRequest } from "../interface/api.interface";

export const signinAPI = (data: SigninRequest): Promise<any> =>
  apiInstance.post("http://192.168.69.21:8080/api/v1/timesheet/signin", data);

export const signoutAPI = (data: SigninRequest): Promise<any> =>
  apiInstance.post("http://192.168.69.21:8080/api/v1/timesheet/signout", data);

export const getTimesheetDaya = ({
  user_code,
  work_date,
}: {
  user_code: number;
  work_date: string;
}): Promise<any> =>
  apiInstance.post("http://192.168.69.21:8080/api/v1/timesheet", {
    params: { user_code, work_date },
  });
