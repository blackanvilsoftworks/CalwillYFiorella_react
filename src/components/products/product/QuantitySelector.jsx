const QuantitySelector = ({ selectedColor, quantity, onChangeQuantity, onAddToCart }) => {
    return (
        <>
            {selectedColor?.stock > 0 && (
                <div className="purchase-section">
                    <div className="quantity-controls">
                        <input
                            type="number"
                            className="form-control w-auto d-inline-block"
                            defaultValue={quantity}
                            min="1"
                            max={selectedColor.stock}
                            onBlur={onChangeQuantity}
                        />
                    </div>
                    <button 
                        className="my-2 main-btn-style" 
                        onClick={onAddToCart}
                    >Agregar al carrito
                    </button>
                </div>
            )}
        </>
    );
};
export default QuantitySelector;