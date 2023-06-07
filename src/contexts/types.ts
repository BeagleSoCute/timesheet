import {defaultPaidBreaekType} from 'interface'
interface timeSheetType {
  pin:number, startTime: string, job: string[], remainingHours?:string,
  actualTime?: string,
  paidBreak?: number,
  unpaidBreak?: number,
  isLegalBreak?: boolean,
  defaultBreak?: defaultPaidBreaekType,
}
export interface ReducerType {
    loading: boolean,
    isAuth: boolean, 
    timesheetData : timeSheetType
    allocatedData: Array<object>, 
  }

