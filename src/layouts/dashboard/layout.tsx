import { useCallback, useEffect, useState } from "react";
import AppHeader from "@/components/my-header";
import { withAuthGuard } from "@/hocs/with-auth-guard";
import { decodeToken, decryptJSON } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

export const DashBoardLayout = withAuthGuard((props: any) => {
  const { children } = props;
  const auth = useAuth() as any;
  return (
    <>
      <AppHeader>{children}</AppHeader>
    </>
  );
});
