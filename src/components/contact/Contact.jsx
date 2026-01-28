import { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '../../contexts/Data.jsx';
import { createTitle } from '../../utils/createTitle.jsx';

import './Contact.scss';

const Contact = () => {
    const { globalInfo, arrInfoCardContent } = useContext(DataContext);
    const max_length = 500;

    const initialState = {
        name        : '',
        phone_number: '1122223333',
        message     : ''
    }

    const contactForm = useRef(null);
    const [count, setCount] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
    const [formContent, setFormContent] = useState(initialState);

    const setFormContentState = (e) => {
        const { id, value } = e.target;
        setFormContent((prevState) => ({
            ...prevState,
            [id]: value.toUpperCase()
        }));
    };

    // Validaciones
    const nameValidation = (name) => {
        const cleanedName = name.trim();
        if (!/^[A-Za-zÁáÉéÍíÓóÚúÑñÜü\s]+$/.test(cleanedName)) {
            alert('El nombre solo puede contener letras y espacios.');
            return false;
        }
        return cleanedName.toUpperCase();
    };

    const phoneNumberValidation = (phone) => {
        const cleanedPhoneNumber = phone.trim().replace(/\D/g, '');
        if (!/^[0-9]{10}$/.test(cleanedPhoneNumber)) {
            alert('El número de teléfono debe tener exactamente 10 dígitos.');
            return false;
        }
        return cleanedPhoneNumber;
    };

    const messageValidation = (message) => {
        const cleanedMessage = message.trim();
        if (!/^[A-Za-z0-9ÁáÉéÍíÓóÚúÑñÜü\s.,!?\-]{1,500}$/.test(cleanedMessage)) {
            alert('El mensaje contiene caracteres no permitidos.');
            return false;
        }
        return cleanedMessage;
    };

    const formHandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        // Validaciones...
        const validName     = nameValidation(formContent.name);
        const validPhone    = phoneNumberValidation(formContent.phone_number);
        const validMessage  = messageValidation(formContent.message);
        
        if (!validName || !validPhone || !validMessage) {
            setIsSubmitting(false);
            return;
        }
        
        try {
            const response = await fetch(`https://formsubmit.co/ajax/${globalInfo.email}`, {
                method  : 'POST',
                headers : {
                    'Content-Type'  : 'application/json',
                    'Accept'        : 'application/json'
                },
                body    : JSON.stringify({
                    _subject: 'Nuevo mensaje desde la web',
                    _captcha: 'false',
                    Nombre  : validName,
                    Numero  : validPhone,
                    WhatsApp: `https://wa.me/549${validPhone}`,
                    Mensaje : validMessage
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                setSubmitStatus('success');
                setFormContent(initialState);
                // Auto-ocultar mensaje después de 5 segundos
                setTimeout(() => setSubmitStatus(null), 5000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        setCount(formContent.message.length);
    }, [formContent.message]);

    return (
        <div id="contact_form_container" className="contact_form_container container pt-5 rounded-3">
            <h2 className="text-center mb-4">
                {createTitle('Contáctanos', 'bi bi-mailbox-flag')}
            </h2>
            
            {/* Mensajes de estado */}
            {submitStatus === 'success' && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    ¡Mensaje enviado con éxito! Te contactaremos pronto.
                    <button type="button" className="btn-close" onClick={() => setSubmitStatus(null)}></button>
                </div>
            )}
            
            {submitStatus === 'error' && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    Error al enviar el mensaje. Por favor, intenta nuevamente.
                    <button type="button" className="btn-close" onClick={() => setSubmitStatus(null)}></button>
                </div>
            )}

            <div id="form-row" className="row">
                <form id="contact_form" ref={contactForm} onSubmit={formHandler} noValidate>
                    <input type="text" name="_honey" style={{ display: 'none' }} />
    
                    <div className="form-floating col-12 col-md-6 mb-3 px-1">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            value={formContent.name} 
                            onChange={setFormContentState} 
                            maxLength={30} 
                            required 
                        />
                        <label htmlFor="name">Nombre</label>
                        <p><small className='text-secondary'>*Solo letras</small></p>
                    </div>
    
                    <div className="form-floating col-12 col-md-6 mb-3 px-1">
                        <input 
                            type="tel"  
                            className="form-control" 
                            id="phone_number" 
                            value={formContent.phone_number} 
                            onChange={setFormContentState} 
                            maxLength={10} 
                            pattern="[0-9]{10}"
                            required 
                        />
                        <label htmlFor="phone_number">Número de Teléfono</label>
                        <p><small className='text-secondary'>*Sin el cero y sin espacios ni guiones. Ej: 1122223333</small></p>
                    </div>
    
                    <div className="form-floating col-12 mb-3">
                        <textarea 
                            className="form-control" 
                            id="message" 
                            style={{ height: 100 }} 
                            value={formContent.message} 
                            onChange={setFormContentState} 
                            maxLength={500} 
                            required 
                        />
                        <label htmlFor="message">Mensaje</label>
                        <div className="d-flex justify-content-between">
                            <p><small className='text-secondary'>*Recibirá una respuesta vía WhatsApp lo más pronto posible.</small></p>
                            <p><small>({count}/{max_length} caracteres)</small></p>
                        </div>
                    </div>
    
                    <button 
                        className="btn main-btn-style" 
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                Enviando...
                            </>
                        ) : 'Enviar'}
                    </button>
                </form>
            </div>
            <div className="row mt-3">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xxl-6 ms-auto">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Información de Contacto</h5>
                            <div className="container">
                                {
                                    arrInfoCardContent.map(({type, value, icon}) => (
                                        <div key={type} className="row mb-2">
                                            <div className="col-1"><i className={icon}></i></div>
                                            <div className="col-11">{type}: {value}</div>
                                        </div> 
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Contact;