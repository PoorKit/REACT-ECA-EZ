import './style.css';
import { useState } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Login from './pages/login';
import Home from './pages/home';
import { UserProvider } from './contexts/UserContext';

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, setToken }}>
      <UserProvider>
        {isAuthenticated ? <Home /> : <Login />}
      </UserProvider>
    </AuthContext.Provider>
  );
};
