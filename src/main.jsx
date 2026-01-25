import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BrowserRouter, 
  Routes, 
  Route 
} from 'react-router-dom';

import './index.scss';
import Layout   from './components/layout/Layout.jsx';

import Home     from './pages/Home.jsx';
import ProductsContainer     from './pages/ProductsContainer.jsx';
import Page_404 from './pages/Page_404.jsx';
import ContactContainer from './pages/ContactContainer.jsx';
import Payment_Shipping from './pages/Payment_Shipping.jsx';

import { DataContextProvider } from './contexts/Data.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="productos" element={<ProductsContainer />} />
            <Route path="pagos_envios" element={<Payment_Shipping />} />
            <Route path="contacto" element={<ContactContainer />} />
            <Route path='*' element={<Page_404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataContextProvider>
  </StrictMode>);