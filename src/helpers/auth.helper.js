import cookies from "js-cookie";

export const checkIsAuth = () => {
  const isAuth = cookies.get("isAuth");
  const bool = isAuth ? JSON.parse(isAuth) : false;
  return bool;
};
