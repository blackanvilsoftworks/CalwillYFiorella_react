import { createBrowserRouter } from "react-router-dom";

import Layout from '../components/layout/Layout.jsx';

import Home                 from '../pages/Home.jsx';
import ProductsContainer    from '../pages/ProductsContainer.jsx';
import ProductsDetails      from '../pages/ProductsDetails.jsx';
import ContactContainer     from '../pages/ContactContainer.jsx';
import Payment_Shipping     from '../pages/Payment_Shipping.jsx';

import Login                from "../pages/login/Login.jsx";
import Signup               from "../pages/login/Signup.jsx";

import Error404             from '../pages/errors/Error404.jsx';
// import AdminHome            from "../pages/admin/AdminHome.jsx";
import AdminPanel           from "../pages/AdminPanel.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <Error404 />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "productos",
                element: <ProductsContainer />,
            },
            {
                path: "productos/:id_product",
                element: <ProductsDetails />
            },
            {
                path: "pagos_envios",
                element: <Payment_Shipping />
            },
            {
                path: "contacto",
                element: <ContactContainer />
            },
            {
                path: "iniciar_sesion",
                element: <Login />
            },
            {
                path: "registrarse",
                element: <Signup />
            },
            {
                path: "admin",
                // element: <AdminHome />
                element: <AdminPanel />
            },
        ]
    }
]);

export default router;