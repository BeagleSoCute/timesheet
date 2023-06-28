interface optionReturnType {
  value: string;
  label: string;
}

export const jobOptions: optionReturnType[] = [
  { value: "Front-end developer", label: "Front-end developer" },
  { value: "Back-end developer", label: "Back-end developer" },
];
export const supervisorOptions: optionReturnType[] = [
  { value: "Isabella Brown", label: "Isabella Brown" },
  { value: "Jacob Miller", label: "Jacob Miller" },
];

export const jobTypeOptions: optionReturnType[] = [
  { label: "Operator", value: "Operator" },
  { label: "R&M", value: "R&M" },
  { label: "Labour", value: "Laour" },
];

export const reasonCodeOptions: optionReturnType[] = [
  { value: "codeA", label: "Code-A" },
  { value: "codeB", label: "Code-B" },
  { value: "codeC", label: "Code-C" },
];
