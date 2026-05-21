import { createTitle } from '../../utils/createTitle.jsx';

import './Contact.scss';
import useContactForm from '../../hooks/useContactForm.js';

const Contact = () => {
    const {
        ARR_INFO_CARD_CONTENT,
        formContent,
        fieldErrors,
        count,
        isSubmitting,
        submitStatus,
        setSubmitStatus,
        setContentFormState,
        onSubmitFormHandler
    } = useContactForm();

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
                <form id="contact_form" onSubmit={onSubmitFormHandler} noValidate>
                    <input type="text" name="_honey" style={{ display: 'none' }} />
    
                    <div className="form-floating col-12 col-md-6 mb-3 px-1">
                        <input 
                            type="text" 
                            className={`form-control ${fieldErrors.name ? 'is-invalid' : ''}`} 
                            id="name" 
                            value={formContent.name} 
                            onChange={setContentFormState} 
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
                            onChange={setContentFormState} 
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
                            onChange={setContentFormState} 
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
                                {ARR_INFO_CARD_CONTENT.map(({type, value, icon}) => (
                                    <div key={type} className="row mb-2">
                                        <div className="col-1"><i className={icon}></i></div>
                                        <div className="col-11">{type}: {value}</div>
                                    </div> 
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Contact;