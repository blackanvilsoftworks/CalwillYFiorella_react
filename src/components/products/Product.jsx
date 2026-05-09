import { useState, useEffect } from 'react'
import { 
    getProductDetail, 
    getSizesByProduct,
    getColorsByProductAndSize,
    getVariantImages 
} from '../../services/productService';
import ProductCarousel from './ProductCarousel';

import './Product.scss';
import Loader from '../loader/Loader';
import useMainData from '../../hooks/useMainData';

const Product = ({ id_product }) => {

    const { placeholder } = useMainData();

    // ── Datos cargados desde la BD ──────────────────────────────────────────
    const [product,         setProduct        ] = useState(null)
    const [sizes,           setSizes          ] = useState([])
    const [availableColors, setAvailableColors] = useState([])
    const [images,          setImages         ] = useState([])

    // ── Selección activa ────────────────────────────────────────────────────
    const [selectedSize,  setSelectedSize ] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)

    // ── UI ──────────────────────────────────────────────────────────────────
    // const [currentImage, setCurrentImage] = useState(0)
    const [quantity,     setQuantity    ] = useState(1)
    const [loading,      setLoading     ] = useState(true)
    const [error,        setError       ] = useState(null)

    // ── 1. Cargar producto y talles en paralelo al montar ───────────────────
    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true)
                setError(null)

                const [productData, sizesData] = await Promise.all([
                    getProductDetail(id_product),
                    getSizesByProduct(id_product)
                ])

                setProduct(productData)
                setSizes(sizesData)

                if (sizesData.length > 0) setSelectedSize(sizesData[0])

            } catch (err) {
                setError('Error al cargar el producto')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [id_product])

    // ── 2. Cuando cambia el talle → fetch de colores ────────────────────────
    useEffect(() => {
        if (!selectedSize || !id_product) return

        const loadColors = async () => {
            try {
                setAvailableColors([])
                setSelectedColor(null)

                const colorsData = await getColorsByProductAndSize(id_product, selectedSize.id_size)

                setAvailableColors(colorsData)

                // Auto-seleccionar primer color con stock
                // const firstWithStock = colorsData.find(c => c.stock > 0)
                // if (firstWithStock) setSelectedColor(firstWithStock)
                if (colorsData.length > 0) setSelectedColor(colorsData[0])

            } catch (err) {
                console.error('Error loading colors:', err)
                setAvailableColors([])
            }
        }
        loadColors()
        setQuantity(1)
    }, [selectedSize])

    // ── 3. Cuando cambia el color → fetch de imágenes ───────────────────────
    useEffect(() => {
        if (!selectedColor?.id_variant) return
        const loadImages = async () => {
            try {
                setImages([])
                const imagesData = await getVariantImages(selectedColor.id_variant)
                
                setImages(imagesData)
            } catch (err) {
                console.error('Error loading images:', err)
                setImages([])
            }
        }
        loadImages()
    }, [selectedColor])

    // ── Handlers ────────────────────────────────────────────────────────────

    const handleSizeSelect = (size) => {
        if (size.id_size === selectedSize?.id_size) return
        setSelectedSize(size)
    }

    const handleColorSelect = (color) => {
        if (color.id_variant === selectedColor?.id_variant) return
        setSelectedColor(color)
        setQuantity(1)
    }

    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) return;

        const cartItem = {
            id_variant:          selectedColor.id_variant,
            product_name:        product.product_name,
            variant_description: `${selectedColor.colors.description} - Talle ${selectedSize.size}`,
            sku:                 selectedColor.sku,
            price:               selectedColor.price,
            quantity,
            subtotal:            selectedColor.price * quantity,
            image:               images[0]?.image_url || placeholder
        };

        console.log('Agregar al carrito:', cartItem);
        // TODO: llamar a la función del contexto del carrito
    };

    // ── Renders condicionales ───────────────────────────────────────────────
    if (loading)    return <Loader />;
    if (error)      return <div className="product-error"><p>{error}</p></div>;
    if (!product)   return null; // TODO: Hay que armar algo para mostrar cuando se pone un id_product de un producto que ya no esté disponible

    return (
        <div id="product_container" className="product_container container py-3 py-sm-4 py-md-5 rounded-3">
            <div className="row justify-content-center">

                {/* ── COLUMNA IZQUIERDA: Carousel + Selectores ── */}
                <div className="col-12 col-md-6 px-lg-5">
                    <ProductCarousel 
                        images={images}                        
                        size={selectedSize?.id_size}
                        color={selectedColor?.colors?.id_color}
                    />
                    <p className='text-secondary mt-3'>*Si desea comprar una cantidad superior a la que figura or stock por favor contáctenos vía WhatsApp</p>
                </div>

                {/* ── COLUMNA DERECHA: Info del producto ── */}
                <div className="col-12 col-md px-lg-5">
                    <h1>{product.product_name}</h1>
                    <p>{product.long_desc}</p>

                    {/* PRECIO Y STOCK */}
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

                    {/* SELECTOR DE TALLE */}
                    <div className="selector-group">
                        <label>Talles:</label>
                        <div className="size-options">
                            {sizes.map(size => (
                                <button
                                    key={size.id_size}
                                    className={`my-2 mx-1 main-btn-style ${selectedSize?.id_size === size.id_size ? 'active' : ''}`}
                                    onClick={() => handleSizeSelect(size)}>
                                    {size.size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* SELECTOR DE COLOR */}
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
                                        onClick={() => handleColorSelect(color)}
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

                    {/* CANTIDAD Y CARRITO */}
                    {selectedColor?.stock > 0 && (
                        <div className="purchase-section">
                            <div className="quantity-controls">
                                <input
                                    type="number"
                                    className="form-control w-auto d-inline-block"
                                    defaultValue={quantity}
                                    min="1"
                                    max={selectedColor.stock} 
                                />
                            </div>
                            <button 
                                className="my-2 main-btn-style" 
                                onClick={handleAddToCart}
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