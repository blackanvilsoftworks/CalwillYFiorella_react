import ProductCarousel from './carousel/ProductCarousel';

import './Product.scss';
import Loader from '../../loader/Loader';
import useProductData from '../../../hooks/useProductData';
import SizeSelector from './SizeSelector';
import PriceAndStock from './PriceAndStock';
import ColorSelector from './ColorSelector';
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
                    <PriceAndStock selectedColor={selectedColor} />

                    {/* Size selector */}
                    <SizeSelector
                        sizes={sizes}
                        selectedSize={selectedSize}
                        onSelectedSize={onSelectedSize}
                    />

                    {/* Color selector */}
                    <ColorSelector 
                        availableColors={availableColors}
                        selectedColor={selectedColor}
                        onSelectedColor={onSelectedColor}
                    />

                    {/* Quantity selector and Add to Cart button*/}
                    <QuantitySelector
                        selectedColor={selectedColor}
                        quantity={quantity}
                        onChangeQuantity={onChangeQuantity}
                        onAddToCart={onAddToCart}
                    />
                </div>
            </div>
        </div>
    );
};

export default Product;