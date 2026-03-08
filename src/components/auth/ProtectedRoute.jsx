import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from '../components/loader/Loader';

/**
 * Componente para proteger rutas según rol
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido a renderizar si tiene acceso
 * @param {string|string[]} props.requiredRole - Rol(es) requerido(s) para acceder
 * @param {string} props.redirectTo - Ruta a donde redirigir si no tiene acceso (default: '/')
 */
const ProtectedRoute = ({ 
    children, 
    requiredRole = null, 
    redirectTo = '/' 
}) => {
    const { user, role, loading } = useAuth();

    // Mostrar loader mientras verifica auth
    if (loading) {
        return <Loader />;
    }

    // Si requiere autenticación pero no está logueado
    if (requiredRole && !user) {
        return <Navigate to="/login" replace />;
    }

    // Si requiere un rol específico
    if (requiredRole) {
        const allowedRoles = Array.isArray(requiredRole) 
            ? requiredRole 
            : [requiredRole];

        if (!allowedRoles.includes(role)) {
            // No tiene el rol requerido, redirigir
            return <Navigate to={redirectTo} replace />;
        }
    }

    // Si solo requiere estar logueado (sin rol específico)
    if (requiredRole === 'any' && !user) {
        return <Navigate to="/login" replace />;
    }

    // Tiene acceso, renderizar contenido
    return children;
};

export default ProtectedRoute;
