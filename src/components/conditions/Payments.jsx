import { useContext } from 'react';
import { DataContext } from '../../contexts/Data.jsx';
import { createTitle } from '../../utils/createTitle.jsx';

import './Payments.scss';

const Payments = () => {

    const { arrPayMethods } = useContext(DataContext);
            
    return (
        <div id='pay_methods_container' className='pay_methods_container container text-center'>
            <h2 className="mb-4">
                { createTitle('Métodos de Pago', 'bi bi-cash-coin') }
            </h2>
            <p>Aceptamos los siguientes métodos de pago:</p>
            <ul className="list-unstyled">
                {
                    arrPayMethods.map((method) => (<li key={method}>- {method}</li>))
                }
            </ul>
        </div>
    );
};
export default Payments;