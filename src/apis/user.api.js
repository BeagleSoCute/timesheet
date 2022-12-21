import { apiInstance } from "configs/axios.config";

export const getUserApi = () => apiInstance.get("/user/myData");
