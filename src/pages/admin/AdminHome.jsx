import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminHome = () => {
    const { user, isAdmin } = useAuth();

    const navigate = useNavigate();

    if (!user || !isAdmin) navigate ('/');

    return (
        <div className="container mt-4">
            <h1>Panel Admin</h1>
            <p>Bienvenido al panel de administración. Aquí puedes gestionar usuarios, roles y otras configuraciones del sistema.</p>
            {/* Aquí puedes agregar más funcionalidades específicas para el panel de administración */}
        </div>
    );
};

export default AdminHome;