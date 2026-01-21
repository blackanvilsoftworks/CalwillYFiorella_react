import { useContext } from 'react';
import { DataContext } from '../../contexts/Data.jsx';
import { createTitle } from '../../utils/createTitle.jsx';

import './Payments.scss';

const Payments = () => {

    const { objContainers, arrPayMethods } = useContext(DataContext);
            
    const data = objContainers.payment;

    return (
        <div id={data.id} className={data.className}>
            <h2 className="mb-4">
                { createTitle(data.title, data.icon) }
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