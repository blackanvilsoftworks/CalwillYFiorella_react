import { DataContext } from '../../contexts/Data.jsx';
import useAuth from '../../hooks/useAuth.js';
import { 
    NavLink, 
    Link, 
    useNavigate
} from 'react-router-dom';

import './Menu.scss';
import { useContext, useRef } from 'react';
import MenuNavLink from './MenuNavLink.jsx';

const Menu = () => {
    const { globalInfo } = useContext(DataContext);
    const { user, profile, role, isAdmin, signOut } = useAuth();

    const navigate = useNavigate();

    const links = [
        { name: 'Inicio'                , path: '/'                 },
        { name: 'Catálogo de Productos' , path: '/productos'        },
        { name: 'Pagos y Envíos'        , path: '/pagos_envios'     },
        { name: 'Contacto'              , path: '/contacto'         }
    ];

    const menuBtn   = useRef(null);
    const menuList  = useRef(null);

    const collapseMenu = () => {
        if (!menuBtn.current.classList.contains('collapsed')) {
            menuBtn.current.classList.add('collapsed');
            menuBtn.current.setAttribute('aria-expanded', 'false');
            menuList.current.classList.remove('show');
        }
    };

    const signOutSession = () => {
        signOut();
        collapseMenu();
        navigate ('/');
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
                            links.map(({ name, path }) => (<MenuNavLink key={name} name={name} path={path} collapseMenu={collapseMenu} />))
                        }
                        {
                            !user && (<MenuNavLink name='Iniciar Sesión' path='/iniciar_sesion' collapseMenu={collapseMenu} />)
                        }
                        <MenuNavLink 
                            name={<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>}
                            path='/carrito' 
                            collapseMenu={collapseMenu} 
                            icon={<i className="bi bi-cart3 fs-5"></i>} 
                            className='nav-link position-relative'
                        />
                        {user && (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                >
                                    <i className="bi bi-person-circle me-1"></i>
                                    {profile?.full_name || user?.email}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <span className="dropdown-item-text">
                                            <small className="text-muted">
                                                Rol: <strong>{role}</strong>
                                            </small>
                                        </span>
                                    </li>
                                    {isAdmin && (
                                        <MenuNavLink name='Panel Admin' path='/admin' 
                                            collapseMenu={collapseMenu} 
                                            icon={<i className="bi bi-gear-fill me-1"></i>} 
                                            className='dropdown-item'
                                        />
                                    )}
                                    <li><hr /></li>
                                    <MenuNavLink name='Mi Cuenta' path='/mi_cuenta' 
                                        collapseMenu={collapseMenu} 
                                        icon={<i className="bi bi-person me-2"></i>} 
                                        className='dropdown-item'
                                    />
                                    <MenuNavLink name='Mis Pedidos' path='/mis_pedidos' 
                                        collapseMenu={collapseMenu} 
                                        icon={<i className="bi bi-bag me-2"></i>} 
                                        className='dropdown-item'
                                    />
                                    <li><hr /></li>
                                    <li className='nav-item'>
                                        <button 
                                            type="button" 
                                            className="dropdown-item text-danger"
                                            onClick={signOutSession}
                                        >
                                            <i className="bi bi-box-arrow-right me-2"></i>
                                            Cerrar Sesión
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Menu;