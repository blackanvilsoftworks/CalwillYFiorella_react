import { DataContext } from '../../contexts/Data.jsx';
import { 
    NavLink, 
    Link 
} from 'react-router-dom';

import './Menu.scss';
import { useContext, useRef } from 'react';

const Menu = () => {

    const { globalInfo } = useContext(DataContext);

    const links = [
        { name: 'Inicio'                , path: '/'                 },
        { name: 'Catálogo de Productos' , path: '/productos'        },
        { name: 'Pagos y Envíos'        , path: '/pagos_envios'     },
        { name: 'Contacto'              , path: '/contacto'         },
        { name: 'Iniciar Seción'        , path: '/iniciar_sesion'   },
        { name: 'Registrarse'           , path: '/registrarse'      }
    ];

    const menuBtn   = useRef(null);
    const menuList  = useRef(null);

    const collpaseMenu = () => {
        if (!menuBtn.current.classList.contains('collapsed')) {
            menuBtn.current.classList.add('collapsed');
            menuBtn.current.setAttribute('aria-expanded', 'false');
            menuList.current.classList.remove('show');
        }
    };

    return (
        <nav id="navbar_container" className="navbar navbar-expand-md navbar-light m-0 p-0 fixed-top shadow">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img className="d-inline-block align-text-top me-2" src="/navbar-logo.png" alt={`${globalInfo.name} Logo`} height="40" />
                    <span className="ms-2 navbar-title">{globalInfo.name.toUpperCase()}</span>
                </Link>
                <button ref={menuBtn} className="navbar-toggler border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div ref={menuList} id="navbarNav" className="collapse navbar-collapse text-center ps-auto">
                    <ul className="navbar-nav ms-auto">
                        {
                            links.map(({ name, path }, i) => (
                                <li key={name} className='nav-item'><NavLink className="nav-link" to={path} onClick={collpaseMenu}>{name}</NavLink></li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Menu;