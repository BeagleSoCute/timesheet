import { apiInstance } from "../configs/axios.config";
import { SigninRequest } from "../interface/api.interface";

export const signinAPI = (data: SigninRequest): Promise<any> =>
  apiInstance.post(
    "https://clements-timesheet-be.azurewebsites.net/api/v1/timesheet/entry/signin",
    data
  );

export const signoutAPI = (data: any): Promise<any> =>
  apiInstance.post(
    "https://clements-timesheet-be.azurewebsites.net/api/v1/timesheet/entry/submit",
    data
  );

export const getTimesheetDaya = ({
  user_code,
  work_date,
}: {
  user_code: string;
  work_date: string;
}): Promise<any> =>
  apiInstance.get(
    "https://clements-timesheet-be.azurewebsites.net/api/v1/timesheet/entry",
    {
      params: { user_code, work_date },
    }
  );
