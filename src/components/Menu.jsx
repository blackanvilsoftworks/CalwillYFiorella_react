import { NavLink } from 'react-router-dom';

const Menu = () => {
    return (<>
        <nav id="navbar_container" className="navbar navbar-expand-md navbar-light m-0 p-0 fixed-top shadow">
            <div className="container-fluid">
                <a className="navbar-brand" href="#hero_container">
                    <img className="d-inline-block align-text-top me-2" src="./assets/navbar-logo.png" alt="calwill &amp; fiorella Logo" height="40" />
                    <span className="ms-2 navbar-title">CALWILL &amp; FIORELLA</span>
                </a>
                <button className="navbar-toggler border-0" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navbarNav" className="collapse navbar-collapse text-center ps-auto">
                    <ul className="navbar-nav ms-auto">
                        <NavLink to='/' className="nav-item nav-link">Inicio</NavLink>
                        <NavLink to='/about'>Sobre Nosotros</NavLink>
                        {/* <li className="nav-item"><a className="nav-link" href="#hero_container">Inicio</a></li>
                        <li className="nav-item"><a className="nav-link" href="#about_us_container">Sobre Nosotros</a></li> */}
                        <li className="nav-item"><a className="nav-link" href="#features_container">Características</a></li>
                        <li className="nav-item"><a className="nav-link" href="#products_container">Productos</a></li>
                        <li className="nav-item"><a className="nav-link" href="#shipping_container">Envíos</a></li>
                        <li className="nav-item"><a className="nav-link" href="#pay_methods_container">Pagos</a></li>
                        <li className="nav-item"><a className="nav-link" href="#contact_form_container">Contacto</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </>);
};
export default Menu;