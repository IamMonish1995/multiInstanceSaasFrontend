import { createContext, useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props: any) => {
  const { children } = props;
  const initialized = useRef(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    try {
      setIsAuthenticated(window.sessionStorage.getItem("authenticated") === "true");      
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
    try {
      window.sessionStorage.setItem("authenticated", "true");
      setIsAuthenticated(true)     
      console.log(isAuthenticated);
    } catch (err) {
      console.error(err);
    }
    // fetch user data

    // set to session storage
  };

  const signUp = async (email: any, name: any, password: any) => {
    // create user
  };

  const signOut = () => {
    window.sessionStorage.removeItem("authenticated");
    setIsAuthenticated(false)
  };

  const value: any = {
    isAuthenticated,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
