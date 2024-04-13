import { usePathname, useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
// TODO: Change subtitle text

export const AuthLayout = (props: any) => {
  const { children } = props;
  const pathname = usePathname();
  const router = useRouter();
  const ignore = useRef(false);

  useEffect(() => {
    // Prevent from calling twice in development mode with React.StrictMode enabled

    if (pathname.includes("auth")) {
      if (ignore.current) {
        return;
      }
      ignore.current = true;
      let isAuthenticated =
        window.sessionStorage.getItem("token") != null;
      if (isAuthenticated) {
        console.log("authenticated, redirecting");
        router.push("/dashboard");
      }
    }
  }, []);

  return <>{children}</>;
};

AuthLayout.prototypes = {
  children: PropTypes.node,
};
