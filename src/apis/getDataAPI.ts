import { apiInstance } from "../configs/axios.config";
export const getJobListsAPI = () =>
  apiInstance.get(
    "https://clements-timesheet-be.azurewebsites.net/api/v1/job/list"
  );
export const getOneJobAPI = (jobCode: string) =>
  apiInstance.get(
    `https://clements-timesheet-be.azurewebsites.net/api/v1/job`,
    {
      params: { job_code: jobCode },
    }
  );
export const getOneAssetAPI = (assetCode: string) =>
  apiInstance.get(
    `https://clements-timesheet-be.azurewebsites.net/api/v1/asset`,
    {
      params: { asset_code: assetCode },
    }
  );
export const getAssetListsAPI = () =>
  apiInstance.get(
    `https://clements-timesheet-be.azurewebsites.net/api/v1/asset/list`
  );

export const getOneJobComponentAPI = (analysisCode: string) =>
  apiInstance.get(
    `https://clements-timesheet-be.azurewebsites.net/api/v1/jobcomponent`,
    {
      params: { analysis_code: analysisCode },
    }
  );

export const getJobComponentListsAPI = () =>
  apiInstance.get(
    `https://clements-timesheet-be.azurewebsites.net/api/v1/jobcomponent/list`
  );
