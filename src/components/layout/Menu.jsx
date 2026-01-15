import { 
    NavLink, 
    Link 
} from 'react-router-dom';

import './Menu.scss';

const Menu = () => {
    return (<>
        <nav id="navbar_container" className="navbar navbar-expand-md navbar-light m-0 p-0 fixed-top shadow">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img className="d-inline-block align-text-top me-2" src="/navbar-logo.png" alt="calwill &amp; fiorella Logo" height="40" />
                    <span className="ms-2 navbar-title">CALWILL &amp; FIORELLA</span>
                </Link>
                <button className="navbar-toggler border-0" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navbarNav" className="collapse navbar-collapse text-center ps-auto">
                    <ul className="navbar-nav ms-auto">
                        <li className='nav-item'><NavLink className="nav-link" to='/'>Inicio</NavLink></li>
                        <li className='nav-item'><NavLink className="nav-link" to='/productos'>Productos</NavLink></li>
                        <li className='nav-item'><NavLink className="nav-link" to='/pagos_envios'>Pagos y Envíos</NavLink></li>
                        <li className='nav-item'><NavLink className="nav-link" to='/contacto'>Contacto</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    </>);
};
export default Menu;