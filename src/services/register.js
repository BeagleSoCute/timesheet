import { registerApi } from "apis/auth.api";

export const register = async (data) => {
  try {
    const res = await registerApi(data);
    return true;
  } catch (err) {
    return false;
  }
};
