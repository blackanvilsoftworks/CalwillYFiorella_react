import { Outlet } from "react-router-dom";
import Menu from './Menu.jsx';
import Footer from './Footer.jsx';

const Layout = () => {
    return (<>
        <Menu />
        <Outlet />
        <Footer />
    </>);
};
export default Layout;