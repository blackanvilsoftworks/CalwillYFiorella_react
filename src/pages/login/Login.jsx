import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Login.scss';

const Login = () => {
    const navigate = useNavigate();
    const { user, signIn, signInWithGoogle } = useAuth();

    const [email    , setEmail]     = useState('');
    const [password , setPassword]  = useState('');
    const [loading  , setLoading]   = useState(false);
    const [error    , setError]     = useState(null);

    const [showPassword, setShowPassword] = useState(false);

    // Si hay usuario pero NO estamos en proceso de login (viene de sesión activa)
    if (user && !redirecting) navigate('/mi_cuenta');

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error: signInError } = await signIn(email, password);

        if (signInError) {
            setError(signInError.message);
            setLoading(false);
            return;
        }

        // Redirigir después de login exitoso
        navigate('/productos');
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);

        const { error: googleError } = await signInWithGoogle();

        if (googleError) {
            setError(googleError.message);
            setLoading(false);
        }
        // El redirect es automático con OAuth
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="login_container container py-3 py-sm-4 py-md-5 rounded-3">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-6 text-center">
                    <h2>Iniciar Sesión</h2>

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    {/* LOGIN CON GOOGLE */}
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="main-btn-style mt-3"
                    >
                        Continuar con <i className="bi bi-google"></i>
                    </button>

                    <hr className='my-3'/>

                    {/* LOGIN CON EMAIL/PASSWORD */}
                    <form onSubmit={handleEmailLogin}>
                        
                        <div className="form-floating mb-3">
                            <input
                                id="email"
                                type="email"
                                className='form-control'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                placeholder="Email"
                            />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="password-input-container mb-3">
                            <div className="form-floating position-relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                    placeholder="Contraseña"
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="main-btn-style mb-3"
                        >
                            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                        </button>
                    </form>

                    <div>
                        <p>
                            ¿No tenés cuenta?{' '}
                            <Link to="/registrarse">Registrate</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
