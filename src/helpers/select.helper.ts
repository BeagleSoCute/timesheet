import { jobType } from "../interface/index";
import { assetListType } from "../interface/api.interface";

interface optionReturnType {
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

export const assetOptions = (jobLists: assetListType[]): optionReturnType[] => {
  if (!jobLists) {
    return [];
  }
  return jobLists.map((item: assetListType) => {
    return {
      value: item.assetCode,
      label: item.assetName,
    };
  });
};
