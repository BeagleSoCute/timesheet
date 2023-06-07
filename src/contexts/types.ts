import {defaultPaidBreaekType} from 'interface'
export interface ReducerType {
    loading: boolean,
    isAuth: boolean, 
    timesheetData : {
      pin:number, startTime: string, job: string[], remainingHours?:string,
    
    actualTime?: string,
    paidBreak?: number,
    unpaidBreak?: number,
    isLegalBreak?: boolean,
    defaultBreak?: defaultPaidBreaekType,
    
    
    },
    allocatedData: Array<object>, 
  }
  