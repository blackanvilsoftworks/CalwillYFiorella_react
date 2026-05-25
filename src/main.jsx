import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { MainDataProvider } from './contexts/MainDataContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import router from './router/Router.jsx';
import './index.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainDataProvider>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </MainDataProvider>
  </StrictMode>
);