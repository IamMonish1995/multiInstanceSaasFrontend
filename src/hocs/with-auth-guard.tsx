import { AuthGuard } from "#srcguards/auth-guard.tsx";

// eslint-disable-next-line react/display-name
export const withAuthGuard = (Component:any) => (props:any) => (
  <AuthGuard>
    <Component {...props} />
  </AuthGuard>
);
