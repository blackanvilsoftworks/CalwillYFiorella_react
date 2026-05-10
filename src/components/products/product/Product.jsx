import ProductCarousel from './carousel/ProductCarousel';

import './Product.scss';
import Loader from '../../loader/Loader';
import useProductData from '../../../hooks/useProductData';
const Product = ({ id_product }) => {
    const {
        product,
        sizes,
        selectedSize,
        availableColors,
        selectedColor,
        images,
        quantity,
        loading,
        error,
        onSelectedSize,
        onSelectedColor,
        onChangeQuantity,
        onAddToCart
    } = useProductData(id_product);
    
    // ── Renders optionals ───────────────────────────────────────────────
    if (loading)    return <Loader />;
    if (error)      return <div className="product-error"><p>{error}</p></div>;
    if (!product)   return null; // TODO: Hay que armar algo para mostrar cuando se pone un id_product de un producto que ya no esté disponible

    return (
        <div id="product_container" className="product_container container py-3 py-sm-4 py-md-5 rounded-3">
            <div className="row justify-content-center">

                {/* ── Left column: Carousel ── */}
                <div className="col-12 col-md-6 px-lg-5">
                    <ProductCarousel 
                        images={images}
                        size={selectedSize?.id_size}
                        color={selectedColor?.colors?.id_color}
                    />
                    <p className='text-secondary mt-3'>*Si desea comprar una cantidad superior a la que figura or stock por favor contáctenos vía WhatsApp</p>
                </div>

                {/* ── Right column: Product info and selection buttons ── */}
                <div className="col-12 col-md px-lg-5">
                    <h1>{product.product_name}</h1>
                    <p>{product.long_desc}</p>

                    {/* Price and Stock */}
                    {selectedColor && (
                        <div className="price-section">
                            <p className="price">Precio del artículo seleccionado: ${selectedColor.price.toFixed(2)}</p>
                            <p className={`stock ${selectedColor.stock === 0 ? 'out' : ''}`}>
                                {selectedColor.stock > 0
                                    ? `Stock disponible: ${selectedColor.stock}.`
                                    : 'Sin stock.'}
                            </p>
                        </div>
                    )}

                    {/* Size selector */}
                    <div className="selector-group">
                        <label>Talles:</label>
                        <div className="size-options">
                            {sizes.map(size => (
                                <button
                                    key={size.id_size}
                                    className={`my-2 mx-1 main-btn-style ${selectedSize?.id_size === size.id_size ? 'active' : ''}`}
                                    onClick={() => onSelectedSize(size)}>
                                    {size.size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color selector */}
                    {availableColors.length > 0 && (
                        <div className="selector-group">
                            <label>
                                Color actual: <strong>{selectedColor?.colors?.description || 'Seleccioná un color'}</strong>
                            </label>
                            <div className="my-2 d-flex">
                                {availableColors.map(color => (
                                    <button
                                        key={color.colors.id_color}
                                        className={`rounded-4 p-3 mx-1
                                            ${selectedColor?.id_variant === color.id_variant ? 'active' : ''}
                                            ${color.stock === 0 ? 'disabled' : ''}`}
                                        onClick={() => onSelectedColor(color)}
                                        disabled={color.stock === 0}
                                        title={color.stock === 0
                                            ? `${color.colors.description} - Sin stock`
                                            : color.colors.description}
                                        style={{ backgroundColor: color.colors.hex_code }}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity selector and Add to Cart button*/}
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
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;