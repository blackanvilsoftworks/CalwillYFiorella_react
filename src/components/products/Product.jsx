import { useState, useEffect } from 'react'
import { getProductDetail, getSizesByProduct, getVariantImages } from '../../services/productService';
import ProductCarousel from './ProductCarousel';

const Product = ({id_product}) => {

    // ── Datos cargados desde la BD ──────────────────────────────────────────
    const [product, setProduct]             = useState(null)
    const [sizes, setSizes]                 = useState([])
    const [images, setImages]               = useState([])

    // ── Selección activa ────────────────────────────────────────────────────
    const [selectedSize, setSelectedSize]   = useState(null)   // objeto size completo
    const [selectedColor, setSelectedColor] = useState(null)   // objeto color completo
    const [availableColors, setAvailableColors] = useState([]) // colores del talle activo

    // ── UI ──────────────────────────────────────────────────────────────────
    const [currentImage, setCurrentImage]   = useState(0)
    const [quantity, setQuantity]           = useState(1)
    const [loading, setLoading]             = useState(true)
    const [error, setError]                 = useState(null)

    // ── 1. Cargar producto y talles al montar ───────────────────────────────
    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true)
                setError(null)

                const [productData, sizesData] = await Promise.all([
                    getProductDetail(id_product),
                    getSizesByProduct(id_product)
                ])

                setProduct(productData)
                setSizes(sizesData)

                // Auto-seleccionar el primer talle
                if (sizesData.length > 0) {
                    setSelectedSize(sizesData[0])
                }

            } catch (err) {
                setError('Error al cargar el producto')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        loadProduct()
    }, [id_product])

    // ── 2. Cuando cambia el talle, actualizar colores ───────────────────────
    useEffect(() => {
        if (!selectedSize) return

        // available_colors ya viene embebido en v_variants_by_size, sin fetch extra
        const colors = parseJson(selectedSize.available_colors)
        const colorsWithStock = colors.filter(c => c.stock > 0)

        setAvailableColors(colors)

        // Auto-seleccionar primer color con stock
        if (colorsWithStock.length > 0) {
            setSelectedColor(colorsWithStock[0])
        } else {
            setSelectedColor(null)
        }

        setQuantity(1)
    }, [selectedSize])

    // ── 3. Cuando cambia el color, cargar imágenes de esa variante ──────────
    useEffect(() => {
        if (!selectedColor?.id_variant) return

        const loadImages = async () => {
            try {
                const imagesData = await getVariantImages(selectedColor.id_variant)
                setImages(imagesData)
                setCurrentImage(0)
            } catch (err) {
                console.error('Error loading images:', err)
                setImages([])
            }
        }

        loadImages()
    }, [selectedColor])

    // ── Helpers ─────────────────────────────────────────────────────────────

    // v_variants_by_size devuelve available_colors como string JSON en algunos contextos
    const parseJson = (value) => {
        if (!value) return []
        if (typeof value === 'string') {
            try { return JSON.parse(value) } catch { return [] }
        }
        return value
    }

    const handleSizeSelect = (size) => {
        if (size.id_size === selectedSize?.id_size) return
        setSelectedSize(size)
    }

    const handleColorSelect = (color) => {
        if (color.stock === 0) return
        if (color.id_color === selectedColor?.id_color) return
        setSelectedColor(color)
        setQuantity(1)
    }

    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) return

        const cartItem = {
            id_variant:          selectedColor.id_variant,
            product_name:        product.product_name,
            variant_description: `${selectedColor.color_description} - Talle ${selectedSize.size}`,
            sku:                 selectedColor.sku,
            price:               selectedColor.price,
            quantity,
            subtotal:            selectedColor.price * quantity,
            image:               images[0]?.image_url || null
        }

        console.log('Agregar al carrito:', cartItem)
        // TODO: llamar a la función del contexto del carrito
    }

    // ── Renders condicionales ───────────────────────────────────────────────
    if (loading) return <div className="product-loading">Cargando producto...</div>
    if (error)   return (
        <div className="product-error">
            <p>{error}</p>
        </div>
    )
    if (!product) return null

    const mainImage = images[currentImage]?.image_url || '/placeholder.png'
    const maxQty    = selectedColor?.stock || 1

    return (
        <div id="product_container" className="product_container container py-3 py-sm-4 py-md-5 rounded-3">
            <div className="row justify-content-center">
                <div className="col-6 col-lg-6 px-lg-5">
                    <ProductCarousel 
                        images={images}                        
                        size={selectedSize?.id_size}
                        color={selectedColor?.id_color}
                    />
                    <div>Carousel con imágenes, predefinidas en 1er talle y primer color</div>
                    {/* SELECTOR DE TALLE */}
                    <div className="selector-group">
                        <label>
                            Talle: <strong>{selectedSize?.size}</strong>
                        </label>
                        <div className="size-options">
                            {sizes.map(size => (
                                <button
                                    key={size.id_size}
                                    className={`size-btn ${selectedSize?.id_size === size.id_size ? 'active' : ''}`}
                                    onClick={() => handleSizeSelect(size)}>
                                    {size.size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>Colores</div>
                    {/* SELECTOR DE COLOR */}
                    {availableColors.length > 0 && (
                        <div className="selector-group">
                            <label>
                                Color: <strong>{selectedColor?.color_description || 'Seleccioná un color'}</strong>
                            </label>
                            <div className="color-options">
                                {availableColors.map(color => (
                                    <button
                                        key={color.id_color}
                                        className={`color-btn
                                            ${selectedColor?.id_color === color.id_color ? 'active' : ''}
                                            ${color.stock === 0 ? 'disabled' : ''}`}
                                        onClick={() => handleColorSelect(color)}
                                        disabled={color.stock === 0}
                                        title={color.stock === 0
                                            ? `${color.color_description} - Sin stock`
                                            : color.color_description}>
                                        <span className="color-swatch"
                                            style={{ background: color.hex_code }} />
                                        <span className="color-label">{color.color_description}</span>
                                        {color.stock === 0 && (
                                            <span className="no-stock-label">Sin stock</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <div>Debe consultarse cuantos talles hay y poner los botones</div>
                    <div>Luego consultar cuantos colores hay para el primer taller</div>
                    <div>Cada vez que se selecciones un nuevo talle se renovará la consulta de colores</div>
                    <div>Cada vez que se seleccione un color se realizará una nueva consulta por las imágenes</div>
                </div>
                <div className="col-6 col-lg-6 px-lg-5">
                    {/* <div>Producto individual id:{product && product.id_product}</div> */}
                    <h1>{product.product_name}</h1>
                    {/* <div>Categoría: {product && product.categories.description.toUpperCase()}</div> */}
                    <div>Descripción larga del producto {product.long_desc}</div>
                    {/* <div>Talle Actual: {actualSize && actualSize.size_description}</div> */}
                    <div>Precio:</div>
                    {/* PRECIO Y STOCK */}
                    {selectedColor && (
                        <div className="price-section">
                            <p className="price">${selectedColor.price.toFixed(2)}</p>
                            <p className={`stock ${selectedColor.stock === 0 ? 'out' : ''}`}>
                                {selectedColor.stock > 0
                                    ? `${selectedColor.stock} disponibles`
                                    : 'Sin stock'}
                            </p>
                        </div>
                    )}
                    <div>Mostrar stock disponible para variante actual</div>
                    <div>Cantidad</div>
                    <div>Si desea comprar una cantidad superior a la que figura or stock por favor contáctenos por WhatsApp</div>
                    {/* <button className="add-to-cart">Agregar al carrito</button> */}
                    {/* CANTIDAD Y CARRITO */}
                    {selectedColor?.stock > 0 && (
                        <div className="purchase-section">
                            <div className="quantity-controls">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    disabled={quantity <= 1}>−</button>
                                <input type="number" value={quantity}
                                    onChange={e => setQuantity(
                                        Math.min(maxQty, Math.max(1, parseInt(e.target.value) || 1))
                                    )}
                                    min="1" max={maxQty} />
                                <button onClick={() => setQuantity(q => Math.min(maxQty, q + 1))}
                                    disabled={quantity >= maxQty}>+</button>
                            </div>

                            <button className="add-to-cart-btn" onClick={handleAddToCart}>
                                Agregar al carrito
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Product;