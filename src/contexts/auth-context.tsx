import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { login } from "@/services/authRequest";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import useStorage from "@/hooks/useStorage";

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props: any) => {
  const router = useRouter();
  const { children } = props;
  const [configData, setConfigData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token, setToken, clearAll } = useStorage();

  const { isSignedIn, user } = useUser();
  console.log({user});
  
  const initialize = async () => {
    if (isSignedIn && user && !token) {
      try {
        if (isLoading != true) {
          setIsLoading(true);
          signIn("monishbarse9@gmail.com", "abcdefg")
            .then((res) => {
              console.log({ res });
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

  const signIn = async (email: any, password: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        // await login({
        //   email: "monishbarse19@gmail.com",
        //   username: "monishbarse19@gmail.com",
        //   external_user_id: "1",
        // })
        //   .then((res) => {
        //     //     if (res.status == "success") {
        //     //       setToken(res.result);
        //     //       router.push("/dashboard");
        //     //       resolve(res.message);
        //     //     } else {
        //     //       reject(res.message);
        //     //     }
        //   })
        // .catch((err) => {
        //   console.log(err);
        //   reject(err);
        // });

        setTimeout(() => {
          setToken("abcd");
          resolve("Success");
        }, 3000);
      } catch (err) {
        console.error(err);
        reject("Failed");
      }
    });
    // fetch user data
    // set to session storage
  };

  const signOut = () => {
    clearAll();
  };

  const value: any = {
    configData,
    setConfigData,
    isLoading,
    setIsLoading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
