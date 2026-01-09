import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BrowserRouter, 
  Routes, 
  Route 
} from 'react-router-dom';

// import './index.css';
import Layout   from './components/Layout.jsx';

import Home     from './paages/Home.jsx';
import Page_404 from './pages/Page_404.jsx';

// import { ContextProvider } from './contexts/Context.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ContextProvider> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/productos" element={<AboutUs />} />
            <Route path="/pagos-envios" element={<AboutUs />} />
            <Route path="/contacto" element={<AboutUs />} />
            <Route path='*' element={<Page_404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    {/* </ContextProvider> */}
  </StrictMode>);