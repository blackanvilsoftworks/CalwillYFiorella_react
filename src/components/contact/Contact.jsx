import { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '../../contexts/Data.jsx';
import { createTitle } from '../../utils/createTitle.jsx';

import './Contact.scss';

// TODO: Hacer que salten popups en vez de alerts

const Contact = () => {

    const { globalInfo, arrInfoCardContent } = useContext(DataContext);

    const inputName         = useRef(null);
    const inputPhoneNumber  = useRef(null);
    const inputMessage      = useRef(null);
    const contactForm       = useRef(null);

    const max_length = 500;
    const [count, setCount] = useState(0);

    const [message, setMessage] = useState({
        name            : '',
        phone_number    : '54901122223333',
        message         : ''
    });

    const setMessageState = (e) => {
        const {id, value} = e.target;
        setMessage((prevState) => ({                          
            ...prevState,
            [id]: value.toUpperCase()
        }));
    };    

    const nameValidation = () => {
        const cleanedName = inputName.current.value.trim();
        if (!/^[A-Za-z\s]+$/.test(cleanedName)) {
            alert('El nombre solo puede contener letras y espacios.');
            inputName.current.focus();
            return false;
        }
        return cleanedName.toUpperCase();
    };

    const phoneNumberValidation = () => {
        const cleanedPhoneNumber = inputPhoneNumber.current.value.trim().replace(/\D/g, '');
        if (!/^[0-9]{10,14}$/.test(cleanedPhoneNumber)) {
            alert('El número de teléfono no puede contener espacios ni símbolos, y debe tener entre 10 y 14 caracteres.');
            inputPhoneNumber.current.focus();
            return false;
        }    
        return cleanedPhoneNumber; 
    };

    const messageValidation = () => {
        const cleanedMessage = inputMessage.current.value.trim();
        if (!/^[A-Za-z0-9\-\s.,]{1,500}$/.test(cleanedMessage)) {
            alert('El mensaje no puede contener caracteres especiales.');
            inputMessage.current.focus();
            return false;
        }
        return cleanedMessage; 
    };

    const formHandler = (e) => {    
        e.preventDefault();
        
        const cleanedPhoneNumber = phoneNumberValidation(inputPhoneNumber);

        if (!nameValidation(inputName) || !cleanedPhoneNumber || !messageValidation(inputMessage)) return;
    
        inputPhoneNumber.current.value = `https://wa.me/549${cleanedPhoneNumber}`;
        
        contactForm.current.submit();
        contactForm.current.reset();
    };
    
    useEffect(() => {
        if (inputName.current)          inputName.current.value         = message.name;
        if (inputPhoneNumber.current)   inputPhoneNumber.current.value  = message.phone_number;
        if (inputMessage.current)       inputMessage.current.value      = message.message;
    }, [message]);

    useEffect(() => {
        setCount(message.message.length);
    }, [message.message]);

    return (
        <div id="contact_form_container" className="contact_form_container container pt-5 rounded-3">
            <h2 className="text-center mb-4">
                { createTitle('Contáctanos', 'bi bi-mailbox-flag') }
            </h2>
            <div id="form-row" className="row">
                <form id="contact_form" action={`https://formsubmit.co/${globalInfo.email}`} method="POST" ref={contactForm} onSubmit={formHandler}>
                    <input type="hidden" name="_subject"    value="Nuevo mensaje desde la web" />
                    <input type="hidden" name="_template"   value="table" />
                    <input type="hidden" name="_next"       value={`${globalInfo.web}/contacto`} />
                    <input type="hidden" name="_captcha"    value="false" />
                    <div className="form-floating col-12 col-md-6 mb-3 px-1">
                        <input type="text" className="form-control" id="name" name="Nombre" ref={inputName} onChange={setMessageState} maxLength={30} required/>
                        <label htmlFor="name">Nombre</label>
                        <p><small className='text-secondary'>*Solo letras</small></p>
                    </div>
                    <div className="form-floating col-12 col-md-6 mb-3 px-1">
                        <input type="phone-number" className="form-control" id="phone_number" name="Teléfono" ref={inputPhoneNumber} onChange={setMessageState} maxLength={14} required/>
                        <label htmlFor="phone_number">Número de Teléfono</label>
                        <p><small className='text-secondary'>*Sin espacios ni guiones 1122223333</small></p>
                    </div>
                    <div className="form-floating col-12 mb-3">
                        <textarea className="form-control" id="message" name="Mensaje" style={{height: 100}} ref={inputMessage} onChange={setMessageState} maxLength={500} required />
                        <label htmlFor="message">Mensaje</label>
                        <div className="d-flex justify-content-between">
                            <p><small className='text-secondary'>*Recibirá una respuesta vía WhatsApp lo más pronto posible.</small></p>
                            <p><small>({count ?? 0}/{max_length} caracteres.)</small></p>
                        </div>
                    </div>
                    <button className="btn main-btn-style" type="submit">Enviar</button>
                </form>
            </div>
            <div className="row mt-3">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xxl-6 ms-auto">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Información de Contacto</h5>
                            <div className="container">
                                {
                                    arrInfoCardContent.map( ({type, value, icon}, index) => (
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
        </div>);
};
export default Contact;