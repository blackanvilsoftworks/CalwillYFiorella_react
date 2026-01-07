import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BrowserRouter, 
  Routes, 
  Route 
} from 'react-router-dom';

// import './index.css';
import Layout   from './components/Layout.jsx';
import Hero     from './components/Hero.jsx';
import Page_404 from './pages/Page_404.jsx';
import AboutUs from './components/AboutUs.jsx';
// import { ContextProvider } from './contexts/Context.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ContextProvider> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Hero />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path='*' element={<Page_404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    {/* </ContextProvider> */}
  </StrictMode>);