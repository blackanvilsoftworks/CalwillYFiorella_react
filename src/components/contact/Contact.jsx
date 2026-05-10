import { useEffect, useRef, useState } from 'react';
import useMainData from '../../hooks/useMainData.js';
import { createTitle } from '../../utils/createTitle.jsx';

import './Contact.scss';

// HACER QUE PONGA POR DEFECTO EL NOMBRE Y NUMERO DE TELEFONO DEL USUARIO SI ES QUE ESTÁ LOGGEADO

const Contact = () => {
    const { globalInfo } = useMainData();

    const arrInfoCardContent = [
        {
            type    : 'Email',
            value   : globalInfo.email,
            icon    : 'bi bi-envelope-fill'
        },
        {
            type    : 'Teléfono',
            value   : globalInfo.phoneNumber,
            icon    : 'bi bi-telephone-fill'
        },
        {
            type    : 'Horario',
            value   : 'Lunes a Sábado de 09:00 a 18:00',
            icon    : 'bi bi-clock-fill'
        }
    ];

    const initialState = {
        name        : '',
        phone_number: '',
        message     : ''
    };

    const contactForm = useRef(null);

    const [ count        , setCount          ] = useState(0);
    const [ isSubmitting , setIsSubmitting   ] = useState(false);
    const [ submitStatus , setSubmitStatus   ] = useState(null); // 'success', 'error', null
    const [ formContent  , setFormContent    ] = useState(initialState);
    const [ fieldErrors  , setFieldErrors    ] = useState(initialState);

    const setFormContentState = (e) => {
        const { id, value } = e.target;
        const upperValue    = value.toUpperCase();
        setFormContent((prevState) => ({
            ...prevState,
            [id]: upperValue
        }));
        // Validar campo al escribir
        validateField(id, upperValue);
    };

    // Validaciones
    const validationResult = {
        success: (value) => ({ 
            isValid: true, 
            message: '', 
            value 
        }),
        
        error: (message) => ({ 
            isValid: false, 
            message, 
            value: ''
        })
    };

    const nameValidation = (name) => {
        const cleanedName = name.trim();
        if (!cleanedName)                                       return validationResult.error('El nombre es requerido.');
        if (!/^[A-Za-zÁáÉéÍíÓóÚúÑñÜü\s]+$/.test(cleanedName))   return validationResult.error('El nombre solo puede contener letras y espacios.');
        return validationResult.success(cleanedName.toUpperCase());
    };

    const phoneNumberValidation = (phone) => {
        const cleanedPhoneNumber = phone.trim().replace(/\D/g, '');
        if (!cleanedPhoneNumber)                        return validationResult.error('El número de teléfono es requerido.');
        if (!/^[0-9]{10}$/.test(cleanedPhoneNumber))    return validationResult.error('El número debe tener exactamente 10 dígitos.');
        return validationResult.success(cleanedPhoneNumber);
    };

    const messageValidation = (message) => {
        const cleanedMessage = message.trim();
        if (!cleanedMessage)                                                    return validationResult.error('El mensaje es requerido.');
        if (!/^[A-Za-z0-9ÁáÉéÍíÓóÚúÑñÜü\s.,$!?-]{1,500}$/.test(cleanedMessage)) return validationResult.error('El mensaje contiene caracteres no permitidos.');
        return validationResult.success(cleanedMessage);
    };

    const validators = {
        name        : nameValidation,
        phone_number: phoneNumberValidation,
        message     : messageValidation
    };

    // Validar un campo específico
    const validateField = (fieldId, value) => {
        const result = validators[fieldId]?.(value);

        if (result) {
            setFieldErrors((prevErrors) => ({
                ...prevErrors,
                [fieldId]: result.isValid ? '' : result.message
            }));
        }
    };

    // Validar todos los campos
    const validateAllFields = () => {
        const nameResult    = nameValidation(formContent.name);
        const phoneResult   = phoneNumberValidation(formContent.phone_number);
        const messageResult = messageValidation(formContent.message);

        setFieldErrors({
            name        : nameResult.message,
            phone_number: phoneResult.message,
            message     : messageResult.message
        });

        return nameResult.isValid && phoneResult.isValid && messageResult.isValid;
    };

    const formHandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        // Validar todos los campos
        const isFormValid = validateAllFields();
        
        if (!isFormValid) return setIsSubmitting(false);

        // Obtener valores validados
        const validName     = nameValidation(formContent.name).value;
        const validPhone    = phoneNumberValidation(formContent.phone_number).value;
        const validMessage  = messageValidation(formContent.message).value;
        
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
                setFieldErrors(initialState);
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
                            className={`form-control ${fieldErrors.name ? 'is-invalid' : ''}`} 
                            id="name" 
                            value={formContent.name} 
                            onChange={setFormContentState} 
                            maxLength={30} 
                            required 
                        />
                        <label htmlFor="name">Nombre</label>
                        <p className="m-0"><small className='text-secondary'>*Solo letras</small></p>
                        {fieldErrors.name && (
                            <div className="invalid-feedback d-block">
                                {fieldErrors.name}
                            </div>
                        )}
                    </div>
    
                    <div className="form-floating col-12 col-md-6 mb-3 px-1">
                        <input 
                            type="tel"  
                            className={`form-control ${fieldErrors.phone_number ? 'is-invalid' : ''}`} 
                            id="phone_number" 
                            value={formContent.phone_number} 
                            onChange={setFormContentState} 
                            maxLength={10} 
                            pattern="[0-9]{10}"
                            required 
                        />
                        <label htmlFor="phone_number">Número de Teléfono</label>
                        <p className="m-0"><small className='text-secondary'>*Sin el cero y sin espacios ni guiones. Ej: 1122223333</small></p>
                        {fieldErrors.phone_number && (
                            <div className="invalid-feedback d-block">
                                {fieldErrors.phone_number}
                            </div>
                        )}
                    </div>
    
                    <div className="form-floating col-12 mb-3">
                        <textarea 
                            className={`form-control ${fieldErrors.message ? 'is-invalid' : ''}`} 
                            id="message" 
                            style={{ height: 100 }} 
                            value={formContent.message} 
                            onChange={setFormContentState} 
                            maxLength={500} 
                            required 
                        />
                        <label htmlFor="message">Mensaje</label>
                        <div className="d-flex justify-content-between">
                            <p className="m-0"><small className='text-secondary'>*Recibirá una respuesta vía WhatsApp lo más pronto posible.</small></p>
                            <p className="m-0"><small>({count}/500 caracteres)</small></p>
                        </div>
                        {fieldErrors.message && (
                            <div className="invalid-feedback d-block">
                                {fieldErrors.message}
                            </div>
                        )}
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