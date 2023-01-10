import { registerApi } from "apis/auth.api";

export const register = async (data) => {
  try {
    const {success} = await registerApi(data);
    return success;
  } catch (err) {
    return false;
  }
};
