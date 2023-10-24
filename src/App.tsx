import './style.css';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { ProductContextProvider } from './contexts/ProductContext';


import Login from './pages/login';
import Home from './pages/home';

import Modal from 'react-modal';
Modal.setAppElement('#app');

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
              <Toaster
                toastOptions={{
                  success: {
                    style: {
                      background: 'green',
                      color: 'white',
                      fontSize: '20px'
                    },
                  },
                  error: {
                    style: {
                      background: 'red',
                      color: 'white',
                      fontSize: '20px'
                    },
                  },
                }} />
            </ProductContextProvider>
            :
            <Login />
        }
      </UserProvider>
    </AuthContext.Provider>
  );
};
