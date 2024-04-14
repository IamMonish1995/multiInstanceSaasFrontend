import { createContext, useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { loginorganization } from "#srcservices/organizationRequest.ts";
import { useRouter } from "next/navigation";

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props: any) => {
  const router = useRouter();
  const { children } = props;
  const initialized = useRef(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [organizationData, setOrganizationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    try {
      let checktoken = window.sessionStorage.getItem("token") as string
      setIsAuthenticated(window.sessionStorage.getItem("token") != null);
      setToken(checktoken) ;
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      // get userdetails
      // set to session storage
    } else {
      initialize();
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
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
