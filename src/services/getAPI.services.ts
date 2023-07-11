import {
  getJobListsAPI,
  getAssetListsAPI,
  getOneJobAPI,
  getJobComponentListsAPI,
} from "../apis/getDataAPI";
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
      costCenterRequire: item.cost_centre_required,
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

export const getSupervisors = async (): Promise<returnAxiosResponseType> => {
  const { success, payload }: any = await getJobComponentListsAPI();
  const onlySupervisor = payload.list.filter(
    (item: any) => item.supervisor === true
  );
  return {
    success,
    payload: onlySupervisor,
  };
};

export const getOptions = async (): Promise<any> => {
  const [jobLists, assetLists, supervisorLists] = await Promise.all([
    getJobLists(),
    getAssetLists(),
    getSupervisors(),
  ]);
  if (!jobLists.success || !assetLists.success || !supervisorLists.success) {
    return {
      success: false,
      jobLists: [],
      assetLists: [],
      supervisorLists: [],
    };
  }
  return {
    success: true,
    jobLists: jobLists.payload,
    assetLists: assetLists.payload,
    supervisorLists: supervisorLists.payload,
  };
};

export const getOneJobByCode = async (
  code: string
): Promise<returnAxiosResponseType> => {
  const { success, payload }: any = await getOneJobAPI(code);
  return {
    success,
    payload,
  };
};
