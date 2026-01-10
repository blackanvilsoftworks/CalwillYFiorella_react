import { NavLink } from 'react-router-dom';

import './Menu.css';

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
                        <NavLink to='/'>Inicio</NavLink>
                        <NavLink to='/productos'>Productos</NavLink>
                        <NavLink to='/pagos_envios'>Pagos y Envíos</NavLink>
                        <NavLink to='/contacto'>Contacto</NavLink>
                    </ul>
                </div>
            </div>
        </nav>
    </>);
};
export default Menu;