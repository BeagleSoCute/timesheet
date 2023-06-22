import { signinAPI, signoutAPI } from "../apis/timesheet.api";
import { SigninRequest } from "../interface/api.interface";
import { getObjectFromLocalStorage } from "../helpers/localstorage.helper";
import dayjs, { Dayjs } from "dayjs";
import {
  dateFormat,
  backendTimeFormat,
  backendDateFormat,
} from "../constants/format";

interface signinPropsType {
  isForgetSignin: boolean;
  signinTime: Dayjs;
  startDateTime: Dayjs;
  longitude: number;
  latitude: number;
}

interface signoutPropsType {
  finishTime: Dayjs;
  isForgetSingout: boolean;
  signinData: SigninRequest | null;
}

export const signin = async (data: signinPropsType) => {
  const { startDateTime, signinTime, isForgetSignin, longitude, latitude } =
    data;
  const transformData = {
    id: 0,
    user_code: getObjectFromLocalStorage("userData").user_code,
    work_date: dayjs(startDateTime).format(backendDateFormat), //startDateTime
    start_time: dayjs(startDateTime).format(backendTimeFormat), //startDateTime
    sign_in_time: dayjs(signinTime).format(backendTimeFormat), //signInTime
    updated_start_time: dayjs(startDateTime).format(backendTimeFormat), //startDateTime
    sign_in_latitude: latitude,
    sign_in_longitude: longitude,
    is_forget_sing_in: isForgetSignin,
    end_time: dayjs(startDateTime).format(backendTimeFormat),
    sign_out_time: dayjs(signinTime).format(backendTimeFormat),
    udpated_end_time: dayjs(startDateTime).format(backendTimeFormat),
    is_forget_sign_out: false,
    unpaid_break_time: 0,
    updated_unpaid_break_time: 0,
    updated_unpaid_reason: "",
    paid_break_time: 0,
    updated_paid_break_time: 0,
    updated_paid_reason: "",
    status: 1,
    frontend_id: "",
    record_revision: 0,
  };
  console.log("transformData", transformData);
  const { success, payload } = await signinAPI(transformData);
  return { success, payload: transformData };
};

export const signout = async (data: signoutPropsType) => {
  const { finishTime, isForgetSingout, signinData } = data;
  if (!signinData) {
    return { success: false, payload: {} };
  }
  const transformData = {
    id: 0,
    user_code: getObjectFromLocalStorage("userData").user_code,
    work_date: signinData.work_date,
    start_time: signinData.start_time,
    sign_in_time: signinData.sign_in_time,
    updated_start_time: signinData.updated_start_time,
    sign_in_latitude: signinData.sign_in_latitude,
    sign_in_longitude: signinData.sign_in_longitude,
    is_forget_sing_in: signinData.is_forget_sing_in,
    end_time: dayjs(finishTime).format(backendTimeFormat),
    sign_out_time: dayjs().format(backendTimeFormat),
    udpated_end_time: dayjs(finishTime).format(backendTimeFormat),
    is_forget_sign_out: isForgetSingout,
    unpaid_break_time: 0,
    updated_unpaid_break_time: 0,
    updated_unpaid_reason: "",
    paid_break_time: 0,
    updated_paid_break_time: 0,
    updated_paid_reason: "",
    status: 2,
    frontend_id: "",
    record_revision: 0,
  };
  console.log("transformData", transformData);
  const { success, payload } = await signoutAPI(transformData);
  return { success, payload: transformData };
};
