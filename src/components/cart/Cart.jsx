import useCart from '../../hooks/useCart';
import './Cart.scss';
import { formatCurrency } from '../../utils/helpers';
import EmptyCart from './EmptyCart';

const Cart = () => {
    const { cartItems, cartTotal, updateQuantity, removeItem, clearCart } = useCart();

    // ── Estado vacío ───────────────────────────────────────────────────────
    if (cartItems.length === 0) return (<EmptyCart />);

    return (
        <div className="cart-page">
            <div className="container">
                <h1 className="cart-title">Tu carrito</h1>
                <p className="cart-subtitle">{cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'} seleccionados</p>

                <div className="row">
                    {/* ── Lista de ítems ── */}
                    <div className="col-12 col-lg-8">
                        {cartItems.map((item) => (
                            <div className="cart-item" key={item.id_variant}>
                                <img
                                    className="cart-item__image"
                                    src={item.image}
                                    alt={item.product_name}
                                    onError={e => e.target.style.opacity = '0.3'}
                                />

                                <div className="cart-item__info">
                                    <div className="cart-item__name">{item.product_name}</div>
                                    <div className="cart-item__variant">{item.variant_description}</div>
                                    <div className="cart-item__sku">SKU: {item.sku}</div>
                                    <div className="cart-item__price">
                                        Precio unitario: {formatCurrency(item.price)}
                                    </div>
                                </div>

                                <div className="cart-item__controls">
                                    {/* Control de cantidad */}
                                    <div className="cart-item__qty">
                                        <button
                                            aria-label="Reducir cantidad"
                                            disabled={item.quantity <= 1}
                                            onClick={() => updateQuantity(item.id_variant, item.quantity - 1)}
                                        >
                                            −
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            aria-label="Aumentar cantidad"
                                            onClick={() => updateQuantity(item.id_variant, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Subtotal */}
                                    <div className="cart-item__subtotal">
                                        {formatCurrency(item.price * item.quantity)}
                                    </div>

                                    {/* Eliminar ítem */}
                                    <button
                                        className="cart-item__remove"
                                        aria-label={`Eliminar ${item.product_name} del carrito`}
                                        onClick={() => removeItem(item.id_variant)}
                                        title="Eliminar del carrito"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── Resumen del carrito ── */}
                    <div className="col-12 col-lg-4">
                        <div className="cart-summary">
                            <div className="cart-summary__title">Resumen del pedido</div>

                            {cartItems.map((item) => (
                                <div className="cart-summary__row" key={item.id_variant}>
                                    <span>{item.product_name} × {item.quantity}</span>
                                    <span>{formatCurrency(item.price * item.quantity)}</span>
                                </div>
                            ))}

                            <div className="cart-summary__row cart-summary__row--total">
                                <span>Total</span>
                                <span className="cart-summary__total-value">
                                    {formatCurrency(cartTotal)}
                                </span>
                            </div>

                            {/* TODO: integrar con Mercado Pago */}
                            <button
                                className="btn-checkout"
                                onClick={() => alert('Iniciar compra — integración con Mercado Pago pendiente')}
                            >
                                Iniciar compra
                            </button>

                            <button
                                className="btn-clear"
                                onClick={clearCart}
                            >
                                Vaciar carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;