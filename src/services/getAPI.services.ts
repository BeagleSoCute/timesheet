import { getJobListsAPI, getAssetListsAPI } from "../apis/getDataAPI";
import { jobType } from "../interface/index";
import {
  returnAxiosResponseType,
  assetListType,
  assetListResponseType,
} from "../interface/api.interface";

export const getJobLists = async (): Promise<returnAxiosResponseType> => {
  const res: any = await getJobListsAPI();
  const transformData = res.payload.list.map((item: any): jobType => {
    return {
      jobType: item.job_type,
      jobCode: item.job_code,
      jobName: item.job_name,
      customerName: item.customer_name,
    };
  });
  return { success: res.success, payload: transformData };
};
export const getAssetLists = async (): Promise<returnAxiosResponseType> => {
  const res: any = await getAssetListsAPI();
  const transformData = res.payload.list.map(
    (item: assetListResponseType): assetListType => {
      return {
        assetCode: item.asset_code,
        assetName: item.asset_name,
      };
    }
  );
  return { success: res.success, payload: transformData };
};

export const getOptions = async (): Promise<any> => {
  const [jobLists, assetLists] = await Promise.all([
    getJobLists(),
    getAssetLists(),
  ]);
  if (jobLists.success === false) {
    return { success: false, jobLists: [], assetLists: [] };
  }
  return {
    success: true,
    jobLists: jobLists.payload,
    assetLists: assetLists.payload,
  };
};
