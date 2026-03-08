import useAuth from '../hooks/useAuth';

const AdminPanel = () => {
    const { user, profile, role, signOut } = useAuth();

    return (
        <div className="admin_panel_container container py-3 py-sm-4 py-md-5 rounded-3">
            <div className="row justify-content-center">
                <div className="col-10 col-lg-8">
                    <h1>Panel de Administración</h1>

                    <div className="card mb-4">
                        <div className="card-header">
                            <h5>Información del Usuario</h5>
                        </div>
                        <div className="card-body">
                            <p><strong>Email:</strong> {user?.email}</p>
                            <p><strong>Nombre:</strong> {profile?.full_name}</p>
                            <p><strong>Rol:</strong> <span className="badge bg-primary">{role}</span></p>
                            <p><strong>Teléfono:</strong> {profile?.phone || 'No especificado'}</p>
                            {profile?.company_name && (
                                <p><strong>Empresa:</strong> {profile.company_name}</p>
                            )}
                        </div>
                    </div>

                    <div className="alert alert-info">
                        <h5>Acciones disponibles según tu rol:</h5>
                        <ul>
                            {role === 'superadmin' && (
                                <>
                                    <li>✅ Crear y gestionar admins</li>
                                    <li>✅ Crear usuarios mayoristas</li>
                                    <li>✅ Gestionar productos y stock</li>
                                    <li>✅ Ver todas las ventas</li>
                                    <li>✅ Acceso total al sistema</li>
                                </>
                            )}
                            {role === 'admin' && (
                                <>
                                    <li>✅ Crear usuarios mayoristas</li>
                                    <li>✅ Gestionar productos y stock</li>
                                    <li>✅ Ver todas las ventas</li>
                                    <li>❌ No puede crear otros admins</li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-primary">
                            Gestionar Productos
                        </button>
                        <button className="btn btn-outline-primary">
                            Ver Ventas
                        </button>
                        {(role === 'admin' || role === 'superadmin') && (
                            <button className="btn btn-outline-success">
                                Crear Usuario Mayorista
                            </button>
                        )}
                        {role === 'superadmin' && (
                            <button className="btn btn-outline-warning">
                                Crear Admin
                            </button>
                        )}
                        <button 
                            className="btn btn-outline-danger ms-auto" 
                            onClick={signOut}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
