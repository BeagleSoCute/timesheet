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
