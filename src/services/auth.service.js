import { loginApi, logoutApi } from "apis/auth.api";

export const login = async (data) => {
  try {
    await loginApi(data);
  } catch (err) {
    return { success: false };
  }
  return { success: true };
};

export const logout = async () => {
  const { success } = await logoutApi();
  if (success) {
    return true;
  } else {
    return false;
  }
};
