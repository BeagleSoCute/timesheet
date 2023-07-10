import { jobType } from "../interface/index";
import { assetListType } from "../interface/api.interface";

export interface optionReturnType {
  value: string;
  label: string;
}
export const jobOptions = (jobLists: jobType[]): optionReturnType[] => {
  if (!jobLists) {
    return [];
  }
  return jobLists.map((item: jobType) => {
    return {
      value: item.jobCode,
      label: `${item.jobName} | ${item.customerName} `,
    };
  });
};
export const handleFilter = (
  input: string,
  option: { value: string; label: string }
) => {
  return option.label.toLowerCase().includes(input.toLowerCase());
};

export const assetOptions = (
  assetLists: assetListType[]
): optionReturnType[] => {
  if (!assetLists) {
    return [];
  }
  return assetLists.map((item: assetListType) => {
    return {
      value: item.assetCode,
      label: item.assetName,
    };
  });
};

export const handleRMJoblist = (jobLists: any): jobType[] => {
  const res = jobLists.find((item: any) => item.jobCode === "ASSET");
  return [res];
};

export const costCenterOptions = (codeList: any): optionReturnType[] => {
  return codeList.cost_centre_list.map((item: any) => {
    return {
      value: item.cost_centre_code,
      label: item.cost_centre_name,
    };
  });
};
