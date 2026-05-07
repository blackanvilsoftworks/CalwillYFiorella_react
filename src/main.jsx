import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.scss';

import { DataContextProvider } from './contexts/Data.jsx';
import router from './router/Router.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { MainDataProvider } from './contexts/MainDataContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataContextProvider>
      <MainDataProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </MainDataProvider>
    </DataContextProvider>
  </StrictMode>);