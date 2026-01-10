// import './PayMethods.css';

const Payments = () => {
    return (
        <div id="pay_methods_container" className="container text-center mt-0 pt-5">
            <h2 className="mb-4">
                <span className="title">Métodos de Pago <i className="bi bi-cash-coin"></i></span>
            </h2>
            <p>Aceptamos los siguientes métodos de pago:</p>
            <ul className="list-unstyled">
                <li>- Transferencia bancaria a cuenta de Mercado Pago</li>
                <li>- Efectivo (10% de descuento)</li>
            </ul>
        </div>
    );
};
export default Payments;