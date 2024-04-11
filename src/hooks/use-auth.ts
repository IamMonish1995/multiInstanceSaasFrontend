import { AuthContext } from '#srccontexts/auth-context.tsx';
import { useContext } from 'react';

export const useAuth = () => useContext(AuthContext);
