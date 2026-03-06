// const Error404 = () => (
//     <div className="conteiner_404">
//         <h1>Error 404!</h1>
//         <h2>Page Not Found</h2>
//         <p>Sorry, the page you are looking for does not exist.</p>
//     </div>
// );
// export default Error404;

import { Link } from 'react-router-dom';
import './Error404.scss';

const Error404 = () => {
    return (
        <div className="error-404-container">
            <div className="container">
                <div className="row justify-content-center align-items-center min-vh-100">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="error-card text-center">
                            
                            {/* Número 404 con efecto */}
                            <div className="error-number">
                                <span className="digit">4</span>
                                <span className="digit zero">0</span>
                                <span className="digit">4</span>
                            </div>
                            
                            {/* Icono o imagen decorativa */}
                            <div className="error-icon">
                                <i className="bi bi-emoji-frown"></i>
                            </div>
                            
                            {/* Mensaje principal */}
                            <h1 className="error-title">
                                ¡Ups! Página no encontrada
                            </h1>
                            
                            {/* Descripción */}
                            <p className="error-description">
                                La página que estás buscando no existe, fue eliminada 
                                o cambió de dirección.
                            </p>
                            
                            {/* Línea decorativa */}
                            <div className="error-divider">
                                <span></span>
                                <i className="bi bi-shield-shaded"></i>
                                <span></span>
                            </div>
                            
                            {/* Sugerencias */}
                            <div className="error-suggestions">
                                <p className="suggestion-text">
                                    <i className="bi bi-lightbulb"></i>
                                    Puedes intentar:
                                </p>
                                <ul className="suggestion-list">
                                    <li>
                                        <i className="bi bi-house-door"></i>
                                        <Link to="/" className="suggestion-link">
                                            Volver al inicio
                                        </Link>
                                    </li>
                                    <li>
                                        <i className="bi bi-grid"></i>
                                        <Link to="/productos" className="suggestion-link">
                                            Ver nuestros productos
                                        </Link>
                                    </li>
                                    <li>
                                        <i className="bi bi-envelope"></i>
                                        <Link to="/contacto" className="suggestion-link">
                                            Contactar soporte
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            
                            {/* Botones de acción */}
                            <div className="error-actions">
                                <Link to="/" className="btn main-btn-style-inverted">
                                    <i className="bi bi-house-door me-2"></i>
                                    Ir al Inicio
                                </Link>
                                <button 
                                    onClick={() => window.history.back()} 
                                    className="btn main-btn-style"
                                >
                                    <i className="bi bi-arrow-left me-2"></i>
                                    Volver Atrás
                                </button>
                            </div>
                            
                            {/* Código de error técnico (opcional) */}
                            <div className="error-code mt-4">
                                <small className="text-muted">
                                    Error 404 | Página no encontrada
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error404;