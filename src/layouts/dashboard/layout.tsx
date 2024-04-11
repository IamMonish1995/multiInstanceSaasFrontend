import { useCallback, useEffect, useState } from "react";
import AppHeader from "#srccomponents/my-header.tsx";
import { withAuthGuard } from "#srchocs/with-auth-guard.tsx";



export const DashBoardLayout = withAuthGuard((props :any) => {
  const { children } = props;
  return (
    <>
      <AppHeader>{children}</AppHeader>
    </>
  );
});
