import { registerApi } from "apis/auth.api";

export const register = async (data) => {
  try {
    await registerApi(data);
    return true;
  } catch (err) {
    return false;
  }
};
