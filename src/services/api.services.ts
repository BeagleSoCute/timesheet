import { getJobListsAPI, getOneJobAPI } from "../apis/getDataAPI";
import { jobListsAPiReturnType, jobType } from "../interface/index";

export const getJobLists = async (): Promise<jobListsAPiReturnType> => {
  const res: any = await getJobListsAPI();
  console.log("res", res);
  const transformData = res.payload.map((item: any): jobType => {
    return {
      jobCode: item.job_code,
      jobName: item.job_name,
    };
  });

  return { success: res.success, payload: transformData };
};
