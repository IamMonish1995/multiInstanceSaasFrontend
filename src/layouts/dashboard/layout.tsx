import { useCallback, useEffect, useState } from "react";
import AppHeader from "#srccomponents/my-header.tsx";
import { withAuthGuard } from "#srchocs/with-auth-guard.tsx";
import { decodeToken, decryptJSON } from "#srclib/utils.ts";
import { useAuth } from "#srchooks/use-auth.ts";

export const DashBoardLayout = withAuthGuard((props: any) => {
  const { children } = props;
  const auth = useAuth() as any;
  useEffect(() => {
    if (window.sessionStorage.getItem("token")) {
      let decodedTokenData = decodeToken(
        window.sessionStorage.getItem("token")
      ) as any;
      let organizationDataTemp = decryptJSON(
        decodedTokenData.data,
        process.env.NEXT_PUBLIC_JWT_SECRET_KEY
      );
      auth.setOrganizationData(organizationDataTemp);
    }
  }, [window.sessionStorage.getItem("token")]);
  return (
    <>
      <AppHeader>{children}</AppHeader>
    </>
  );
});
