import './style.css';
import { useState } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Login from './pages/login';
import Home from './pages/home';

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {isAuthenticated ? <Home /> : <Login />}
    </AuthContext.Provider>
  );
};
