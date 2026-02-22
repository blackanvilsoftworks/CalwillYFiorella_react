import { createBrowserRouter } from "react-router-dom";

import Layout from '../components/layout/Layout.jsx';

import Home                 from '../pages/Home.jsx';
import ProductsContainer    from '../pages/ProductsContainer.jsx';
import ProductsDetails      from '../pages/ProductsDetails.jsx';
import ContactContainer     from '../pages/ContactContainer.jsx';
import Payment_Shipping     from '../pages/Payment_Shipping.jsx';

import Error404             from '../pages/errors/Error404.jsx';

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
            }
        ]
    }
]);

export default router;