import { getCookie, setCookie, deleteCookie } from "cookies-next";

const useStorage = () => {
  const token = getCookie("token");
  const setToken = (token: string) => {
    setCookie("token", token);
  };
  const removeToken = () => {
    deleteCookie("token");
  };

  const clearAll = () => {
    removeToken()
  };

  return {
    token,
    setToken,
    removeToken,
    clearAll,
  };
};

export default useStorage;
