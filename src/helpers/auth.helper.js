import {getItem} from "services/localStorage.service"

export const isHasTokenInStorage = () => {
    const accessToken = getItem('token');
    if(accessToken){
     return accessToken;
    }
   }