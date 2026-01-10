const Contact = () => {
    return (
        <div id="contact_form_container" className="container mt-4 pt-5 rounded-3">
            <h2 className="text-center mb-4">
                <span className="title">Contáctanos <i className="bi bi-mailbox-flag"></i></span>
            </h2>
            <div id="form-row" className="row">
                <form id="contact_form" action="https://formsubmit.co/calwillyfiorella@gmail.com" method="POST">
                    <input type="hidden" name="_subject" value="Nuevo mensaje desde la web" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_next" value="https://blackanvilsoftworks.github.io/CalwillYFiorella/#contact-form-container" />
                    <input type="hidden" name="_captcha" value="false" />
                    <div className="col-12 col-md-6 mb-3 px-1">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input type="text" name="Nombre" className="form-control" id="name" placeholder="Solo letras" required="" />
                    </div>
                    <div className="col-12 col-md-6 mb-3 px-1">
                        <label htmlFor="phone-number" className="form-label">Número de Teléfono</label>
                        <input type="phone-number" name="Teléfono" className="form-control" id="phone-number" placeholder="Sin espacios ni guiones 1122223333" required="" />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="message" className="form-label">Mensaje</label>
                        <textarea className="form-control" name="Mensaje" id="message" rows="3" placeholder="Recibirá una respuesta vía WhatsApp lo más pronto posible." required=""></textarea>
                    </div>
                    <button className="btn btn-primary" type="submit">Enviar</button>
                </form>
            </div>
            <div className="row mt-3">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xxl-6 ms-auto">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Información de Contacto</h5>
                            <div className="container">
                                <div className="row mb-2">
                                    <div className="col-1"><i className="bi bi-envelope-fill"></i></div>
                                    <div className="col-11">Email: calwillyfiorella@gmail.com</div></div>
                                    <div className="row mb-2"><div className="col-1"><i className="bi bi-telephone-fill"></i></div>
                                    <div className="col-11">Teléfono: +54 9 11-5959-0586</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-1"><i className="bi bi-clock-fill"></i></div>
                                    <div className="col-11">Horario: Lunes a Sábado de 09:00 a 18:00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};
export default Contact;