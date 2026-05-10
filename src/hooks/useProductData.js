import { useState, useEffect } from 'react';
import {
    getProductDetail,
    getSizesByProduct,
    getColorsByProductAndSize,
    getVariantImages
} from '../services/productService';

import useMainData from './useMainData';

const useProductData = ({ id_product }) => {
    const { PLACEHOLDER_IMG } = useMainData();

    // ── Datos cargados desde la BD ──────────────────────────────────────────
    const [product, setProduct] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [availableColors, setAvailableColors] = useState([]);
    const [images, setImages] = useState([]);

    // ── Selección activa ────────────────────────────────────────────────────
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    // ── UI ──────────────────────────────────────────────────────────────────
    // const [currentImage, setCurrentImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ── 1. Cargar producto y talles en paralelo al montar ───────────────────
    useEffect(() => {
        // Loading product
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const [productData, sizesData] = await Promise.all([
                    getProductDetail(id_product),
                    getSizesByProduct(id_product)
                ]);

                setProduct(productData);
                setSizes(sizesData);
                if (sizesData.length > 0) setSelectedSize(sizesData[0]);
            } catch (err) {
                setError(`Error al cargar el producto: ${err.message}`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [id_product]);

    // ── 2. Cuando cambia el talle → fetch de colores ────────────────────────
    useEffect(() => {
        if (!selectedSize || !id_product) return;

        // Loading variant colors when size changes
        (async () => {
            setAvailableColors([]);
            setSelectedColor(null);
            try {
                const colorsData = await getColorsByProductAndSize(id_product, selectedSize.id_size);
                
                setAvailableColors(colorsData);
                
                if (colorsData.length > 0) setSelectedColor(colorsData[0]);
            } catch (err) {
                console.error(`Error al cargar los colores disponibles: ${err.message}`);
            }
        })();
        setQuantity(1);
    }, [id_product, selectedSize]);

    // ── 3. Cuando cambia el color → fetch de imágenes ───────────────────────
    useEffect(() => {
        if (!selectedColor?.id_variant) return;

        // Loading variant images when color changes
        (async () => {
            setImages([]);
            try {
                const imagesData = await getVariantImages(selectedColor.id_variant);
                setImages(imagesData);
            } catch (err) {
                console.error(`Error al cargar las imágenes: ${err.message}`);
            }
        })();
        setQuantity(1);
    }, [selectedColor]);

    // ── Handlers ────────────────────────────────────────────────────────────
    const onSelectedSize = (size) => {
        if (size.id_size === selectedSize?.id_size) return;
        setSelectedSize(size);
    };

    const onSelectedColor = (color) => {
        if (color.id_variant === selectedColor?.id_variant) return;
        setSelectedColor(color);
    };

    const onChangeQuantity = (event) => {
        const q = parseInt(event.target.value);
        (q > 0 && q <= selectedColor.stock)
            ? setQuantity(q)
            : alert('La cantidad ingresada no puede ser mayor a la que figura en el stock. En caso de desear realizar un pedido que supere la cantidad en stock por favor comuníquese con nosotros por nuestros canales.');
    };

    const onAddToCart = () => {
        if (!selectedColor || !selectedSize) return;
        // TODO: Dar alguna advertencia de que no se puede agregar al carrito dependiendo de lo que falte

        const cartItem = {
            id_variant          : selectedColor.id_variant,
            product_name        : product.product_name,
            variant_description : `${selectedColor.colors.description} - Talle ${selectedSize.size}`,
            sku                 : selectedColor.sku,
            price               : selectedColor.price,
            quantity            : quantity,
            subtotal            : selectedColor.price * quantity,
            image               : images[0]?.image_url || PLACEHOLDER_IMG
        };

        console.log(`Agregar al carrito: ${cartItem}`);
        // TODO: llamar a la función del contexto del carrito
    };

    return {
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
    };
};

export default useProductData;