import { createTitle } from '../../utils/createTitle.jsx';
import './Shipping.scss';

const Shipping = () => {
    return (
        <div id="shipping_container" className="container pt-5 text-center">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10">
                    <div className="row mx-3 mx-sm-5 px-3">
                        <div className="col-md-12">
                            <h2 className="mb-4">
                                { createTitle('Opciones de Envío', 'bi bi-rocket-takeoff') }
                            </h2>
                        </div>
                        <div className="col-12 col-md-4 my-3 my-md-0 px-3">
                            <h4 className="subtitles">Retiros en Estación Llavallol</h4>
                            <p>En caso que deseen retirarlo, se realiza la entrega de manera gratuita en el hall de la estación de tren de Llavallol, coordinando día y horario por WhatsApp.</p>
                        </div>
                        <div className="col-12 col-md-4 mb-3 my-md-0 px-3">
                            <h4 className="subtitles">Envíos en GBA</h4>
                            <p>Envío mediante repartidor con un costo adicional. El costo depende de la zona.</p>
                            <p>En caso de seleccionar envío, se deberá abonar el mismo en su totalidad por transeferencia a Mercado Pago el mismo día a modo de anticipo, previo a la salida del repartidor.</p>
                        </div>
                        <div className="col-12 col-md-4 my-md-0 px-3">
                            <h4 className="subtitles">Envíos al Resto del País</h4>
                            <p>Envío mediante Correo Argentino.</p>
                            <p>Envío mediante OCA.</p>
                            <p>Envío mediante Andreani.</p>
                            <p>Envío mediante otras empresas de logística.</p>
                        </div>
                        <div className="col-12 col-md-12 d-flex justify-content-center">
                            <div className="col-12 col-md-8 p-3 shipping_rules_container rounded-3">
                                <h4 className="subtitles">Políticas de Envío</h4>
                                <p>Se coordinará día y horario vía WhatsApp, una vez esté el repartidor en el lugar y hora acordado, se tendrá una tolerancia de 15 minutos.</p>
                                <p>En caso de sobrepasar el tiemo de tolerancia, el pago no es reembolsable, y el repartidor coninuará con el resto de entregas, debiendose pactar una nueva fecha y horario.</p>
                                <p>Dependiendo de la demanda, podría coordinarse para ese mismo día. En cualquier caso, se deberá abonar una nueva cuota de envío.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Shipping;