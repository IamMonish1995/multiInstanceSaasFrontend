import { getCookie, setCookie, deleteCookie } from "cookies-next";

const useStorage = () => {
  const token = getCookie("multisaas_token");
  const setToken = (token: string) => {
    setCookie("multisaas_token", token);
  };
  const removeToken = () => {
    deleteCookie("multisaas_token");
  };
  // 
  const userData = getCookie("userdata");
  const setUserData = (userData: any) => {
    setCookie("userdata", userData);
  };
  const removeUserData = () => {
    deleteCookie("userdata");
  };
  // 
  const selectedProfile = getCookie("selectedprofile");
  const setSelectedProfile = (selectedprofile: any) => {
    setCookie("selectedprofile", JSON.stringify(selectedprofile));
  };
  const removeSelectedProfile = () => {
    deleteCookie("selectedprofile");
  };
// 
const ProfileConfig = getCookie("profileconfig");
const setProfileConfig = (profileConfig: any) => {
  setCookie("profileconfig", JSON.stringify(profileConfig));
};
const removeProfileConfig = () => {
  deleteCookie("profileconfig");
};

// 
  const logOut = () => {
    removeToken()
    removeUserData()
    removeSelectedProfile()
    removeProfileConfig()
  };

  return {
    token,
    setToken,
    removeToken,
    logOut,
    userData,
    setUserData,
    selectedProfile,
    setSelectedProfile,
    ProfileConfig,
    setProfileConfig
  };
};

export default useStorage;
