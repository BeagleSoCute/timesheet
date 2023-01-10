import { loginApi, logoutApi } from "apis/auth.api";
import { notification } from "helpers/notification.helper";
export const login = async (data) => {
  const { success } = await loginApi(data);
  if (success) {
    notification({ type: "success", message: "Login Success" });
    return true;
  } else {
    notification({ type: "error", message: "Login fail!" });
    return false;
  }
};

export const logout = async () => {
  const { success } = await logoutApi();
  if (success) {
    notification({ type: "success", message: "Logout Success" });
    return true;
  } else {
    notification({ type: "error", message: "Logout fail!" });
    return false;
  }
};
