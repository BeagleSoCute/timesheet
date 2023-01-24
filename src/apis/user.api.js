import { apiInstance } from "configs/axios.config";

export const getUserApi = () => apiInstance.get("/user/myData");
export const getAllUsersApi = () => apiInstance.get("/user/allUsers")
export const getUserDetailsApi = (id) => apiInstance.get(`/user/details/${id}`)