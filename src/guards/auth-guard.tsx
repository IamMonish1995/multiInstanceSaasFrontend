"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import useStorage from "@/hooks/useStorage";
import { useUser } from "@clerk/nextjs";

export const AuthGuard = (props: any) => {
  const { children } = props;
  const router = useRouter();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);
  const { token } = useStorage();
  const { isSignedIn } = useUser();


  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (ignore.current) {
      return;
    }

    ignore.current = true;
    if (!token && !isSignedIn) {
      console.log("Not authenticated, redirecting");
      router
        .replace({
          pathname: "sign-in",
          query:
            router.asPath !== "/" ? { continueUrl: router.asPath } : undefined,
        })
        .catch(console.error);
    } else {
      setChecked(true);
    }
  }, [router.isReady]);

  if (!checked) {
    return null;
  }
  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
