import React from "react";
import { Select } from "antd";
import { jobListsType, jobType } from "interface/index";
const options = (jobLists: jobType[]): { value: string; label: string }[] => {
  return jobLists.map((item: jobType) => {
    return { value: item.jobCode, label: item.jobName };
  });
};
const handleFilter = (
  input: string,
  option: { value: string; label: string }
) => {
  return option.label.toLowerCase().includes(input.toLowerCase());
};

const SelectJobOption = ({ jobLists }: jobListsType) => {
  return (
    <Select
      mode="multiple"
      filterOption={handleFilter}
      options={options(jobLists)}
    />
  );
};

export default SelectJobOption;
