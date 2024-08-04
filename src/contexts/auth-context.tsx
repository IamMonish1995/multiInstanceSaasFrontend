import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { login, getProfileConfig } from "@/services/authRequest";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import useStorage from "@/hooks/useStorage";
import { decodeToken, decryptJSON, encryptJSON, getDefaultProfile } from "@/lib/utils";

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props: any) => {
  const router = useRouter();
  const { children } = props;
  const [isLoading, setIsLoading] = useState(false);
  const {
    token,
    setToken,
    logOut,
    setUserData,
    selectedProfile,
    setSelectedProfile,
    ProfileConfig,
    setProfileConfig
  } = useStorage();

  const { isSignedIn, user } = useUser();

  const initialize = async () => {
    if (isSignedIn && user && !token) {
      try {
        if (isLoading != true) {
          setIsLoading(true);
          signIn(user.id)
            .then((res: any) => {
              // selecting default profile
              if (!selectedProfile) {
                const defaultProfile = getDefaultProfile(res.userProfiles)
                setSelectedProfile(defaultProfile)
                getConfig(defaultProfile.role_id._id)
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
  };

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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
