import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { loginorganization } from "#srcservices/organizationRequest.ts";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props: any) => {
  const router = useRouter();
  const { children } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [organizationData, setOrganizationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { isSignedIn, user } = useUser();
  const initialize = async () => {
    if (isSignedIn && user && !isAuthenticated) {
      try {
        if (isLoading != true) {
          setIsLoading(true);
          toast.promise(signIn("monishbarse9@gmail.com", "abcdefg"), {
            loading: "Loading...",
            success: (data: any) => <b>{data}</b>,
            error: (err: any) => <b>{err}</b>,
          });
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }else{
      if(!isSignedIn){
        signOut()
      }
    }
  };

  useEffect(
    () => {
      initialize();
    },
    [user]
  );

  const signIn = async (email: any, password: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        await loginorganization({ adminemail: email, adminpassword: password })
          .then((res) => {
            if (res.status == "success") {
              window.sessionStorage.setItem("token", res.result);
              setIsAuthenticated(true);
              setToken(res.result);
              router.push("/dashboard");
              resolve(res.message);
            } else {
              reject(res.message);
            }
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      } catch (err) {
        console.error(err);
        reject(reject);
      }
    });
    // fetch user data
    // set to session storage
  };

  const signUp = async ({ email, name, password }: any) => {
    // create user
  };

  const signOut = () => {
    window.sessionStorage.clear();
    setIsAuthenticated(false);
    setToken("");
  };

  const value: any = {
    organizationData,
    setOrganizationData,
    isLoading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    signIn,
    signUp,
    signOut,
    token, setToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
