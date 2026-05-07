import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import './Signup.scss';

const Signup = () => {
    const navigate = useNavigate();
    const { user, signUp, signInWithGoogle } = useAuth();

    // Si hay usuario pero NO estamos en proceso de login (viene de sesión activa)
    if (user /*&& !redirecting*/) navigate('/mi_cuenta');

    const [formData, setFormData] = useState({
        full_name       : '',
        email           : '',
        phone           : '',
        password        : '',
        confirmPassword : ''
    });

    const [loading  , setLoading]   = useState(false);
    const [error    , setError]     = useState(null);
    const [success  , setSuccess]   = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const registerError = (msg) => {
        setError(msg);
        setLoading(false);
    };

    const handleEmailRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        // Validaciones
        if (formData.password.length < 6) return registerError('La contraseña debe tener al menos 6 caracteres');
        if (formData.password !== formData.confirmPassword) return registerError('Las contraseñas no coinciden');

        // Lo dejo comentado ya que no usa el data en ningú lado
        // const { data, error: signUpError } = await signUp(
        const { error: signUpError } = await signUp(
            formData.email,
            formData.password,
            {
                full_name: formData.full_name,
                phone: formData.phone
            }
        );

        if (signUpError) return registerError(signUpError.message);

        // Registro exitoso
        setSuccess(true);
        setLoading(false);

        // Nota: Supabase por defecto requiere confirmación de email
        // Redirigir a página de "revisa tu email" o login

        // Acá en lugar de redirigir quiero mostrar un mensaje con un useRef apuntando a un div que se muestre 
        // por 10 segundos solo cuando success=true, ya que la redirección al loggin es automática al confirmar el 
        // email, y no quiero que el usuario se pierda el mensaje de "revisa tu email"
        
        setTimeout(() => {
            navigate('/login');
        }, 3000);
    }

    const handleGoogleRegister = async () => {
        setLoading(true);
        setError(null);

        const { error: googleError } = await signInWithGoogle();

        if (googleError) registerError(googleError.message);
        // El redirect es automático con OAuth
    }

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div className="signup_container container py-3 py-sm-4 py-md-5 rounded-3">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-6 text-center">
                    <h2>Crear Cuenta</h2>

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success" role="alert">
                            ¡Cuenta creada! Revisá tu email para confirmar tu cuenta.
                        </div>
                    )}

                    {/* Signup CON GOOGLE */}
                    <button
                        type="button"
                        onClick={handleGoogleRegister}
                        disabled={loading}
                        className="main-btn-style mt-3"
                    >
                        Registrarse con <i className="bi bi-google"></i>
                    </button>

                    <hr className='my-3'/>

                    {/* Signup CON EMAIL/PASSWORD */}
                    <form onSubmit={handleEmailRegister}>

                        <div className="form-floating mb-3">
                            <input
                                id="full_name"
                                name="full_name"
                                type="text"
                                className='form-control'
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                placeholder="Nombre completo"
                            />
                            <label htmlFor="full_name">Nombre completo</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className='form-control'
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                placeholder="Email"
                            />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                className='form-control'
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={loading}
                                placeholder="Teléfono (opcional)"
                            />
                            <label htmlFor="phone">Teléfono (opcional)</label>
                        </div>

                        <div className="password-input-container mb-3">
                            <div className="form-floating position-relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    placeholder="Contraseña"
                                    minLength={6}
                                />
                                <label htmlFor="password">Contraseña</label>
                                
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={togglePasswordVisibility}
                                    tabIndex="-1"
                                    disabled={loading}
                                >
                                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        <div className="password-input-container mb-3">
                            <div className="form-floating position-relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    className="form-control"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    placeholder="Confirmar contraseña"
                                minLength={6}
                                />
                                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                                
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={toggleConfirmPasswordVisibility}
                                    tabIndex="-1"
                                    disabled={loading}
                                >
                                    <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="main-btn-style mb-3"
                        >
                            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                        </button>
                    </form>

                    <div>
                        <p>
                            ¿Ya tenés cuenta?{' '}
                            <Link to="/iniciar_sesion">Iniciá sesión</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
