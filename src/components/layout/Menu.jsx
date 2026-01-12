import { 
    NavLink, 
    Link 
} from 'react-router-dom';

import './Menu.css';

const Menu = () => {
    return (<>
        <nav id="navbar_container" className="navbar navbar-expand-md navbar-light m-0 p-0 fixed-top shadow">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img className="d-inline-block align-text-top me-2" src="./../../../public/navbar-logo.png" alt="calwill &amp; fiorella Logo" height="40" />
                    <span className="ms-2 navbar-title">CALWILL &amp; FIORELLA</span>
                </Link>
                {/* <a className="navbar-brand" href="#hero_container"></a> */}
                <button className="navbar-toggler border-0" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navbarNav" className="collapse navbar-collapse text-center ps-auto">
                    <ul className="navbar-nav ms-auto">
                        <NavLink className="nav-item" to='/'>Inicio</NavLink>
                        <NavLink className="nav-item" to='/productos'>Productos</NavLink>
                        <NavLink className="nav-item" to='/pagos_envios'>Pagos y Envíos</NavLink>
                        <NavLink className="nav-item" to='/contacto'>Contacto</NavLink>
                    </ul>
                </div>
            </div>
        </nav>
    </>);
};
export default Menu;