import { employeeData } from "data/employees";

export const getEmployeeData = (id) => {
  return employeeData.find((employee) => employee.id === id);
};
