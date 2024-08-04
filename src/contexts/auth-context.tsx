import { createContext, useCallback, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { login, getProfileConfig } from "@/services/authRequest";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import useStorage from "@/hooks/useStorage";
import {
  decodeToken,
  decryptJSON,
  encryptJSON,
  getAccessForMenu,
  getDefaultProfile,
} from "@/lib/utils";

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props: any) => {
  const router = useRouter();
  const { children } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [accessList, setAccessList] = useState([]);
  const {
    token,
    setToken,
    logOut,
    setUserData,
    selectedProfile,
    setSelectedProfile,
    ProfileConfig,
    setProfileConfig,
  } = useStorage();

  const { isSignedIn, user } = useUser();

  const initialize = useCallback(async () => {
    if (isSignedIn && user && !token) {
      try {
        if (isLoading != true) {
          setIsLoading(true);
          signIn(user.id)
            .then((res: any) => {
              // selecting default profile
              if (!selectedProfile) {
                const defaultProfile = getDefaultProfile(res.userProfiles);
                setSelectedProfile(defaultProfile);
                getConfig(defaultProfile.role_id._id);
              }
            })
            .catch((err) => {
              console.log({ err });
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    } else {
      if (!isSignedIn) {
        signOut();
      }
    }
  },[isSignedIn,user]);

  useEffect(() => {
    initialize();
  }, [user]);

  const signIn = async (external_user_id: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        encryptJSON(external_user_id).then(async (encryptedUserId) => {
          await login({
            external_user_id: encryptedUserId,
          })
            .then((res) => {
              if (res.status == "success") {
                setToken(res.result);
                const decodedToken: any = decodeToken(res.result);
                decryptJSON(decodedToken.data).then((decryptedUserData) => {
                  setUserData(decryptedUserData);
                  resolve(decryptedUserData);
                });
                // router.push("/dashboard");
              } else {
                // reject(res.message);
              }
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        });
      } catch (err) {
        console.error(err);
        reject("Failed");
      }
    });
  };
  const getConfig = async (external_role_id: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        encryptJSON(external_role_id).then(async (encryptedroleId) => {
          await getProfileConfig({
            external_role_id: encryptedroleId,
          })
            .then((res) => {
              if (res.status == "success") {
                setProfileConfig(res.result);
                setAccessList(res.result);
                resolve(res.result);
              } else {
                reject(res.message);
              }
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        });
      } catch (err) {
        console.error(err);
        reject("Failed");
      }
    });
  };

  // set permission
  let useraccess_screen;
  let system_admin_dashboard;
  let menus_screen;
  let guest_dashboard;
  let org_admin_dashboard;
  let client_admin_dashboard;
  let system_user_dashboard;
  let org_user_dashboard;
  let client_user_dashboard;
  let org_screen;
  let client_screen;
  let project_screen;
  let instance_screen;
  let membership_screen;
  let transactions;

  if (accessList.length > 0) {
    useraccess_screen = getAccessForMenu("useraccess_screen", accessList);
    system_admin_dashboard = getAccessForMenu(
      "system_admin_dashboard",
      accessList
    );
    menus_screen = getAccessForMenu("menus_screen", accessList);
    guest_dashboard = getAccessForMenu("guest_dashboard", accessList);
    org_admin_dashboard = getAccessForMenu(
      "org_admin_dashboard",
      accessList
    );
    client_admin_dashboard = getAccessForMenu(
      "client_admin_dashboard",
      accessList
    );
    system_user_dashboard = getAccessForMenu(
      "system_user_dashboard",
      accessList
    );
    org_user_dashboard = getAccessForMenu("org_user_dashboard", accessList);
    client_user_dashboard = getAccessForMenu(
      "client_user_dashboard",
      accessList
    );
    org_screen = getAccessForMenu("org_screen", accessList);
    client_screen = getAccessForMenu("client_screen", accessList);
    project_screen = getAccessForMenu("project_screen", accessList);
    instance_screen = getAccessForMenu("instance_screen", accessList);
    membership_screen = getAccessForMenu("membership_screen", accessList);
    transactions = getAccessForMenu("transactions", accessList);
  }

  const permisstions = {
    useraccess_screen,
    system_admin_dashboard,
    menus_screen,
    guest_dashboard,
    org_admin_dashboard,
    client_admin_dashboard,
    system_user_dashboard,
    org_user_dashboard,
    client_user_dashboard,
    org_screen,
    client_screen,
    project_screen,
    instance_screen,
    membership_screen,
    transactions,
  }


  const signOut = () => {
    logOut();
  };

  const value: any = {
    isLoading,
    setIsLoading,
    signIn,
    signOut,
    getConfig,
    ProfileConfig,
    permisstions
  };  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
