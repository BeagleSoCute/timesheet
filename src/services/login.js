import { loginApi } from "apis/auth.api";
import { setItem } from "services/localStorage.service";

export const login = async (data) => {
  let authRes
  try{
     authRes = await loginApi(data);
  }catch(err){
    return {success:false};
  }
  setItem("token", authRes.payload.token);
  return {success:true};
};
