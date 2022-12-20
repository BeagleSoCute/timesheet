import { apiInstance } from "configs/axios.config";

export const getUserData = () => apiInstance.get("/user/myData");
