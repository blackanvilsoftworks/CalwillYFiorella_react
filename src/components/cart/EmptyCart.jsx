import { Link } from "react-router-dom";

const EmptyCart = () => {
    return (
        <div className="cart-page">
            <div className="container">
                <div className="cart-empty">
                    <div className="cart-empty__icon">🛒</div>
                    <h1 className="cart-empty__title">Tu carrito está vacío</h1>
                    <p className="cart-empty__text">
                        Todavía no agregaste ningún producto. ¡Explorá nuestra tienda y encontrá algo que te guste!
                    </p>
                    <Link to="/productos" className="btn main-btn-style-inverted">
                        Ver productos
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default EmptyCart;