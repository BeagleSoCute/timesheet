import { getJobListsAPI, getOneJobAPI } from "../apis/getDataAPI";
import { jobListsAPiReturnType, jobType } from "../interface/index";

export const getJobLists = async (): Promise<jobListsAPiReturnType> => {
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
