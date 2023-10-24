export interface AuthInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  token: string | null;
  setToken: (value: string | null) => void;
}
