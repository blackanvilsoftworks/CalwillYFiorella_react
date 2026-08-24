import useAuth from '../../hooks/useAuth';

const AdminInfo = () => {
    const { 
        user, 
        profile, 
        role 
    } = useAuth();

    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8 align-self-center">
                    <div className="card mb-4">
                        <div className="card-header text-center">
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
                        <h5 className='text-center'>Acciones disponibles según tu rol:</h5>
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
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    );
};

export default AdminInfo;