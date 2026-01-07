import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BrowserRouter, 
  Routes, 
  Route 
} from 'react-router-dom';
// import './index.css';
import './index.css';
import App from './pages/App.jsx';
import Menu from './components/Menu.jsx';
import Page_404 from './pages/Page_404.jsx';
// import { ContextProvider } from './contexts/Context.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ContextProvider> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route index element={<App />} />
            <Route path='*' element={<Page_404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    {/* </ContextProvider> */}
  </StrictMode>);