import './style.css';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import { AuthContext } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { ProductContextProvider } from './contexts/ProductContext';


import Login from './pages/login';
import Home from './pages/home';

import Modal from 'react-modal';
import { CartContextProvider } from './contexts/CartContext';
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
              <CartContextProvider>
                <Router basename='/REACT-ECA-EZ'>
                  <Home />
                </Router>
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
                </CartContextProvider>
            </ProductContextProvider>
            :
            <Login />
        }
      </UserProvider>
    </AuthContext.Provider>
  );
};
