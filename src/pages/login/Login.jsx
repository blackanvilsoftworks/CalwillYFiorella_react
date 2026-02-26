import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Login = () => {
    const navigate = useNavigate()
    const { signIn, signInWithGoogle } = useAuth()

    const [email, setEmail]       = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading]   = useState(false)
    const [error, setError]       = useState(null)

    const handleEmailLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { data, error: signInError } = await signIn(email, password)

        if (signInError) {
            setError(signInError.message)
            setLoading(false)
            return
        }

        // Redirigir después de login exitoso
        navigate('/')
    }

    const handleGoogleLogin = async () => {
        setLoading(true)
        setError(null)

        const { error: googleError } = await signInWithGoogle()

        if (googleError) {
            setError(googleError.message)
            setLoading(false)
        }
        // El redirect es automático con OAuth
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Iniciar Sesión</h2>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {/* LOGIN CON GOOGLE */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="btn-google"
                >
                    <img src="/assets/icons/google.svg" alt="Google" />
                    Continuar con Google
                </button>

                <div className="divider">
                    <span>O</span>
                </div>

                {/* LOGIN CON EMAIL/PASSWORD */}
                <form onSubmit={handleEmailLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-submit"
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                </form>

                <div className="footer-links">
                    <p>
                        ¿No tenés cuenta?{' '}
                        <Link to="/register">Registrate</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
