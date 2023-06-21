import { signinAPI } from "../apis/timesheet.api";
import { SigninRequest } from "../interface/api.interface";
import { getObjectFromLocalStorage } from "../helpers/localstorage.helper";

export const signin = async () => {
  const transformData = {
    id: 0,
    user_code: getObjectFromLocalStorage("userName"),
    work_date: "2023-06-21",
    start_time: "08:00:00",
    sign_in_time: "08:00:00",
    updated_start_time: "08:00:00",
    sign_in_latitude: -36.8935978,
    sign_in_longitude: 174.7837708,
    is_forget_sing_in: false,
    end_time: "08:00:00",
    sign_out_time: "08:00:00",
    udpated_end_time: "08:00:00",
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
  const { success, payload } = await signinAPI(transformData);
  console.log("payload", payload);
  return { success, payload };
};
