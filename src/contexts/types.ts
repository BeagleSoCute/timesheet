export interface ReducerType {
    loading: boolean,
    isAuth: boolean, 
    timesheetData : {pin:number, startTime: string, job: string[]},
    allocatedData: Array<object>, 
  }
  