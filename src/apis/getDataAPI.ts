import { apiInstance } from "configs/axios.config";
export const getJobListsAPI = () =>
  apiInstance.get("http://192.168.69.21:8080/api/v1/job/list");
export const getOneJobAPI = (jobCode: number) =>
  apiInstance.get(`http://192.168.69.21:8080/api/v1/job`, {
    params: { job_code: jobCode },
  });
export const getOneAssetAPI = (assetCode: number) =>
  apiInstance.get(`http://192.168.69.21:8080/api/v1/job`, {
    params: { asset_code: assetCode },
  });
export const getAssetListsAPI = () =>
  apiInstance.get(`http://192.168.69.21:8080/api/v1/asset/list`);

export const getOneJobComponentAPI = (analysisCode: number) =>
  apiInstance.get(`http://192.168.69.21:8080/api/v1/jobcomponent`, {
    params: { analysis_code: analysisCode },
  });

export const getJobComponentListsAPI = () =>
  apiInstance.get(`http://192.168.69.21:8080/api/v1/jobcomponent/list`);
