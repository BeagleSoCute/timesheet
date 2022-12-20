import { loginApi } from "apis/auth.api";
import { setItem } from "services/localStorage.service";

export const login = async (data) => {
  const {
    payload: { token },
    success,
  } = await loginApi(data);
  setItem("token", token);
  if (success) {
    return true;
  } else {
    return false;
  }
};
