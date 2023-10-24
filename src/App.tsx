import './style.css';
import { useState } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { ProductContextProvider } from './contexts/ProductContext';


import Login from './pages/login';
import Home from './pages/home';

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, setToken }}>
      <UserProvider>
        {
          isAuthenticated ?
            <ProductContextProvider>
              <Home />
            </ProductContextProvider>
            :
            <Login />
        }
      </UserProvider>
    </AuthContext.Provider>
  );
};
