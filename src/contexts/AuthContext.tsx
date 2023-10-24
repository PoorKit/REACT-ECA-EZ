import { createContext, useContext } from 'react';

import { AuthInterface } from '../interfaces/AuthInterface';

export const AuthContext = createContext<AuthInterface | undefined>(undefined);

export function useAuthContext() {
  const isAuthenticated = useContext(AuthContext);

  if (isAuthenticated === undefined) {
    throw new Error('useUserContext must be used with a DashboardContext');
  }

  return isAuthenticated;
}
