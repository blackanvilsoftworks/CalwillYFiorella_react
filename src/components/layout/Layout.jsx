import { Outlet } from "react-router-dom";
import Menu from './Menu.jsx';
import Footer from './Footer.jsx';

import './Layout.scss';

const Layout = () => {
    return (
        <div className="layout">
            <Menu />
            <main className="layout__main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
export default Layout;