export interface ErrorResponse {
  response: {
    data: any;
  };
  message: string;
}

export interface LoginResponsePayload {
  id: number;
  user_code: string;
  user_name: string;
  inactive: boolean;
  phone_no: number;
  branch_code: number;
  product_code: string;
  supervisor: boolean;
  admi_manager: boolean;
  cons_manager: boolean;
  quar_manager: boolean;
  tran_manager: boolean;
  work_manager: boolean;
  password: string;
}

export interface LoginResponse {
  code: number;
  msg: string;
  data: LoginResponsePayload;
}

export interface LoginResolveResponse {
  success: boolean;
  payload: LoginResponsePayload;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface SigninRequest {
  id: number;
  user_code: string;
  work_date: string;
  start_time: string;
  sign_in_time: string;
  updated_start_time: string;
  sign_in_latitude: number;
  sign_in_longitude: number;
  is_forget_sing_in: boolean;
  end_time: string;
  sign_out_time: string;
  udpated_end_time: string;
  is_forget_sign_out: boolean;
  unpaid_break_time: number;
  updated_unpaid_break_time: number;
  updated_unpaid_reason: string;
  paid_break_time: number;
  updated_paid_break_time: number;
  updated_paid_reason: string;
  status: number;
  frontend_id: string;
  record_revision: number;
}

export interface assetListResponseType {
  id: number;
  asset_code: string;
  asset_name: string;
  asset_group_code: string;
  category1: string;
  category2: string;
  inactive: boolean;
}

export interface returnAxiosResponseType {
  payload: any;
  success: boolean;
}

export interface assetListType {
  assetCode: string;
  assetName: string;
}
