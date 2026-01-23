import { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '../../contexts/Data.jsx';
import { createTitle } from '../../utils/createTitle.jsx';

import './Contact.scss';

const Contact = () => {

    const { globalInfo, objContainers, arrInfoCardContent } = useContext(DataContext);

    const data = objContainers.contact;

    const inputName         = useRef(null);
    const inputPhoneNumber  = useRef(null);
    const inputMessage      = useRef(null);
    const contactForm       = useRef(null);


    const [message, setMessage] = useState({
        name            : '',
        phone_number    : '',
        message         : ''
    });

    const setMessageState = (e) => {
        const {id, value} = e.target;
        setMessage((prevState) => ({                          
            ...prevState,
            [id]: value.toUpperCase()
        }));
    };

    useEffect(() => {
        if (inputName.current)          inputName.current.value         = message.name;
        if (inputPhoneNumber.current)   inputPhoneNumber.current.value  = message.phone_number;
        if (inputMessage.current)       inputMessage.current.value      = message.message;
    }, [message]);

    const nameValidation = () => {
        const cleanedName = inputName.current.value.trim();
        if (!/^[A-Za-z\s]+$/.test(cleanedName)) {
            alert('El nombre solo puede contener letras y espacios.');
            return false;
        }
        return cleanedName.toUpperCase();
    };

    const phoneNumberValidation = () => {
        const cleanedPhoneNumber = inputPhoneNumber.current.value.trim().replace(/\D/g, '');
        if (!/^[0-9]{14}$/.test(cleanedPhoneNumber)) {
            alert('El número de teléfono no puede contener espacios ni guines, y debe tener 14 caracteres.');
            return false;
        }    
        return cleanedPhoneNumber; 
    };

    const messageValidation = () => {
        const cleanedMessage = inputMessage.current.value.trim();
        if (!/^[A-Za-z0-9\-\s]/g.test(cleanedMessage)) {
            alert('El mensaje no puede contener caracteres especiales.');
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
    
    return (
        <div id={data.id} className={data.className}>
            <h2 className="text-center mb-4">
                { createTitle(data.title, data.icon) }
            </h2>
            <div id="form-row" className="row">
                <form id="contact_form" action={`https://formsubmit.co/${globalInfo.email}`} method="POST" ref={contactForm} onSubmit={formHandler}>
                    <input type="hidden" name="_subject"    value="Nuevo mensaje desde la web" />
                    <input type="hidden" name="_template"   value="table" />
                    <input type="hidden" name="_next"       value={`${globalInfo.web}/contacto`} />
                    <input type="hidden" name="_captcha"    value="false" />
                    <div className="form-floating col-12 col-md-6 mb-3 px-1">
                        <input type="text" className="form-control" id="name" name="Nombre" ref={inputName} onChange={setMessageState} required/>
                        <label htmlFor="name">Nombre</label>
                        <p><small>*Solo letras</small></p>
                    </div>
                    <div className="form-floating col-12 col-md-6 mb-3 px-1">
                        <input type="phone-number" className="form-control" id="phone_number" name="Teléfono" ref={inputPhoneNumber} onChange={setMessageState} required/>
                        <label htmlFor="phone_number">Número de Teléfono</label>
                        <p><small>*Sin espacios ni guiones 1122223333</small></p>
                    </div>
                    <div className="form-floating col-12 mb-3">
                        <textarea className="form-control" id="message" name="Mensaje" style={{height: 100}} ref={inputMessage} onChange={setMessageState} required></textarea>
                        <label htmlFor="message">Mensaje</label>
                        <p><small>*Recibirá una respuesta vía WhatsApp lo más pronto posible.</small></p>
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