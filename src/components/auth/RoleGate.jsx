import useAuth from '../../hooks/useAuth.js';

/**
 * Componente para mostrar/ocultar UI según rol
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido a renderizar si tiene el rol
 * @param {string|string[]} props.allowedRoles - Rol(es) permitido(s)
 * @param {React.ReactNode} props.fallback - Contenido alternativo si no tiene el rol (opcional)
 */
const RoleGate = ({ 
    children, 
    allowedRoles, 
    fallback = null 
}) => {
    const { role, user } = useAuth();

    // Si no requiere estar logueado para ver el contenido
    if (!allowedRoles) {
        return children;
    }

    // Normalizar allowedRoles a array
    const rolesArray = Array.isArray(allowedRoles) 
        ? allowedRoles 
        : [allowedRoles];

    // Verificar si el usuario tiene alguno de los roles permitidos
    const hasAccess = user && rolesArray.includes(role);

    return hasAccess ? children : fallback;
};

export default RoleGate;
