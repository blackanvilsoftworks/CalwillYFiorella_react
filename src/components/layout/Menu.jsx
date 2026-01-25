import { DataContext } from '../../contexts/Data.jsx';
import { 
    NavLink, 
    Link 
} from 'react-router-dom';

import './Menu.scss';
import { useContext } from 'react';

const Menu = () => {

    const { globalInfo } = useContext(DataContext);

    const links = [
        { name: 'Inicio'        , path: '/'             },
        { name: 'Productos'     , path: '/productos'    },
        { name: 'Pagos y Envíos', path: '/pagos_envios' },
        { name: 'Contacto'      , path: '/contacto'     },
    ];

    return (<>
        <nav id="navbar_container" className="navbar navbar-expand-md navbar-light m-0 p-0 fixed-top shadow">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img className="d-inline-block align-text-top me-2" src="/navbar-logo.png" alt={`${globalInfo.name} Logo`} height="40" />
                    <span className="ms-2 navbar-title">{globalInfo.name.toUpperCase()}</span>
                </Link>
                <button className="navbar-toggler border-0" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navbarNav" className="collapse navbar-collapse text-center ps-auto">
                    <ul className="navbar-nav ms-auto">
                        {
                            links.map(({ name, path }, i) => (
                                <li key={name} className='nav-item'><NavLink className="nav-link" to={path}>{name}</NavLink></li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </nav>
    </>);
};
export default Menu;