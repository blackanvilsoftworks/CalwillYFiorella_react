import { useState } from 'react';

import AdminProducts from './AdminProducts';
import AdminInfo from './AdminInfo';
import useAuth from '../../hooks/useAuth';

const AdminPanel = () => {
    const { role } = useAuth();

    const [activeSection, setActiveSection] = useState(<AdminInfo />);

    const renderSection = () => {
        switch (activeSection) {
            case 'products': return <AdminProducts />;
            // case 'ventas': return <AdminVentas />; break;
            // case 'usuario_mayorista': return <AdminUsuarioMayorista />; break;
            // case 'usuario_admin': return <AdminUsuarioAdmin />; break;        
            default: return <AdminInfo />;
        }
    };

    return (
        <div className="admin_panel_container px-3 mx-3 pt-5 rounded-3">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-12">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h5>Panel de Administración</h5>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="d-flex justify-content-center gap-2">
                                <button 
                                    className="btn btn-outline-primary" 
                                    onClick={() => setActiveSection('products')}
                                >
                                    Gestionar Productos
                                </button>
                                <button className="btn btn-outline-primary">
                                    Ver Ventas
                                </button>
                                {(role === 'admin' || role === 'superadmin') && (
                                    <button className="btn btn-outline-success">
                                        Usuarios Mayoristas
                                    </button>
                                )}
                                {role === 'superadmin' && (
                                    <button className="btn btn-outline-warning">
                                        Usuarios Administradores
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    {renderSection()}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;