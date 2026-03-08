import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import RoleGate from '../auth/RoleGate';

const Navbar = () => {
    const { user, profile, role, isAdmin, signOut } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Cal Willy Fiorella
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/productos">Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contacto">Contacto</Link>
                        </li>

                        {/* Mostrar solo si NO está logueado */}
                        {!user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Iniciar Sesión
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link btn btn-primary text-white ms-2" to="/registrarse">
                                        Registrarse
                                    </Link>
                                </li>
                            </>
                        )}

                        {/* Mostrar solo si está logueado */}
                        {user && (
                            <>
                                {/* Panel Admin - solo para admins y superadmins */}
                                <RoleGate allowedRoles={['admin', 'superadmin']}>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin">
                                            <i className="bi bi-gear-fill me-1"></i>
                                            Panel Admin
                                        </Link>
                                    </li>
                                </RoleGate>

                                {/* Mi Cuenta - todos los usuarios logueados */}
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                    >
                                        <i className="bi bi-person-circle me-1"></i>
                                        {profile?.full_name || user.email}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <span className="dropdown-item-text">
                                                <small className="text-muted">
                                                    Rol: <strong>{role}</strong>
                                                </small>
                                            </span>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <Link className="dropdown-item" to="/mi-cuenta">
                                                <i className="bi bi-person me-2"></i>
                                                Mi Cuenta
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/mis-pedidos">
                                                <i className="bi bi-bag me-2"></i>
                                                Mis Pedidos
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button
                                                className="dropdown-item text-danger"
                                                onClick={signOut}
                                            >
                                                <i className="bi bi-box-arrow-right me-2"></i>
                                                Cerrar Sesión
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        )}

                        {/* Carrito - visible para todos */}
                        <li className="nav-item">
                            <Link className="nav-link position-relative" to="/carrito">
                                <i className="bi bi-cart3 fs-5"></i>
                                {/* Badge de cantidad (implementar después) */}
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    0
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
