import { jobType } from "../interface/index";

interface jobReturnType {
  value: string;
  label: string;
}
export const jobOptions = (jobLists: jobType[]): any[] => {
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
