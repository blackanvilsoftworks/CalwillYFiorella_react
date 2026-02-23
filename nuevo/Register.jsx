import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const navigate = useNavigate()
    const { signUp, signInWithGoogle } = useAuth()

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })

    const [loading, setLoading] = useState(false)
    const [error, setError]     = useState(null)
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleEmailRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        // Validaciones
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden')
            setLoading(false)
            return
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            setLoading(false)
            return
        }

        const { data, error: signUpError } = await signUp(
            formData.email,
            formData.password,
            {
                full_name: formData.full_name,
                phone: formData.phone
            }
        )

        if (signUpError) {
            setError(signUpError.message)
            setLoading(false)
            return
        }

        // Registro exitoso
        setSuccess(true)
        setLoading(false)

        // Nota: Supabase por defecto requiere confirmación de email
        // Redirigir a página de "revisa tu email" o login
        setTimeout(() => {
            navigate('/login')
        }, 3000)
    }

    const handleGoogleRegister = async () => {
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
        <div className="register-container">
            <div className="register-card">
                <h2>Crear Cuenta</h2>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success-message">
                        ¡Cuenta creada! Revisá tu email para confirmar tu cuenta.
                        Redirigiendo...
                    </div>
                )}

                {/* REGISTER CON GOOGLE */}
                <button
                    type="button"
                    onClick={handleGoogleRegister}
                    disabled={loading}
                    className="btn-google"
                >
                    <img src="/assets/icons/google.svg" alt="Google" />
                    Registrarse con Google
                </button>

                <div className="divider">
                    <span>O</span>
                </div>

                {/* REGISTER CON EMAIL/PASSWORD */}
                <form onSubmit={handleEmailRegister}>
                    <div className="form-group">
                        <label htmlFor="full_name">Nombre completo</label>
                        <input
                            id="full_name"
                            name="full_name"
                            type="text"
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="Juan Pérez"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Teléfono (opcional)</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="+54 9 11 1234-5678"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="••••••••"
                            minLength={6}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            placeholder="••••••••"
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-submit"
                    >
                        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                    </button>
                </form>

                <div className="footer-links">
                    <p>
                        ¿Ya tenés cuenta?{' '}
                        <Link to="/login">Iniciá sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
