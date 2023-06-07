import { employeeData } from "data/employees";
import {employeeType} from "interface/index"

export const getEmployeeData = (id:string):employeeType | undefined  => {
  return employeeData.find((employee:employeeType) => employee.id === id);
};
