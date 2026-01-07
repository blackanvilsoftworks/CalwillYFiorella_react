import { Outlet } from "react-router-dom";

const Menu = () => {
    return (<>
        <nav id="navbar_container" class="navbar navbar-expand-md navbar-light m-0 p-0 fixed-top shadow">
            <div class="container-fluid">
                <a class="navbar-brand" href="#hero_container">
                    <img class="d-inline-block align-text-top me-2" src="./assets/navbar-logo.png" alt="calwill &amp; fiorella Logo" height="40" />
                    <span class="ms-2 navbar-title">CALWILL &amp; FIORELLA</span>
                </a>
                <button class="navbar-toggler border-0" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" type="button">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div id="navbarNav" class="collapse navbar-collapse text-center ps-auto">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link" href="#hero_container">Inicio</a></li>
                        <li class="nav-item"><a class="nav-link" href="#about_us_container">Sobre Nosotros</a></li>
                        <li class="nav-item"><a class="nav-link" href="#features_container">Características</a></li>
                        <li class="nav-item"><a class="nav-link" href="#products_container">Productos</a></li>
                        <li class="nav-item"><a class="nav-link" href="#shipping_container">Envíos</a></li>
                        <li class="nav-item"><a class="nav-link" href="#pay_methods_container">Pagos</a></li>
                        <li class="nav-item"><a class="nav-link" href="#contact_form_container">Contacto</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <Outlet />
    </>);
};
export default Menu;