import { createTitle } from '../../utils/createTitle.jsx';
import './Payments.scss';

const Payments = () => {
    return (
        <div id='pay_methods_container' className='pay_methods_container container text-center'>
            <h2 className="mb-4">
                { createTitle('Métodos de Pago', 'bi bi-cash-coin') }
            </h2>
            <p>Aceptamos los siguientes métodos de pago:</p>
            <ul className="list-unstyled">
                <li><i className="bi bi-bank"></i> Transferencia bancaria a cuenta de Mercado Pago</li>
                <li><i className="bi bi-cash-stack"></i> Efectivo (10% de descuento)</li>
            </ul>
        </div>
    );
};
export default Payments;