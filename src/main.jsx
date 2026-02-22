import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './index.scss';

import { DataContextProvider } from './contexts/Data.jsx';
import router from './router/Router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataContextProvider>
      <RouterProvider router={router} />
    </DataContextProvider>
  </StrictMode>);