import './Footer.css';

const Footer = () => {
    return (
        <footer id="footer_container" className="text-center pt-4 mt-3">
            <div className="container pt-0">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <div className="row">
                            <div className="col-12 col-sm-6 mb-3">
                                <button id="btn_facebook" className="btn btn-outline-primary w-100" type="button"><i className="bi bi-facebook"></i> Facebook</button>
                            </div>
                            <div className="col-12 col-sm-6 mb-3">
                                <button id="btn_whatsapp" className="btn btn-outline-success w-100" type="button"><i className="bi bi-whatsapp"></i> Whatsapp</button>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-12">
                                <h5>Calwill &amp; Fiorella</h5>
                                <p>Distribuidores de calzado infantil y calzado para adultos. Comodidad y estilo para toda la familia.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>);
};
export default Footer;