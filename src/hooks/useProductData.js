import { useState, useEffect, useCallback } from 'react';
import {
    getProductDetail,
    getSizesByProduct,
    getColorsByProductAndSize,
    getVariantImages
} from '../services/productService';

import useMainData from './useMainData';
import useCart from './useCart';

const useProductData = (id_product) => {
    const { PLACEHOLDER_IMG }   = useMainData();
    const { addToCart }         = useCart();

    // ── Datos cargados desde la BD ──────────────────────────────────────────
    const [product          , setProduct]           = useState(null);
    const [sizes            , setSizes]             = useState([]);
    const [availableColors  , setAvailableColors]   = useState([]);
    const [images           , setImages]            = useState([]);

    // ── Selección activa ────────────────────────────────────────────────────
    const [selectedSize , setSelectedSize]  = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    // ── UI ──────────────────────────────────────────────────────────────────
    // const [currentImage, setCurrentImage] = useState(0);
    const [quantity , setQuantity]  = useState(1);
    const [loading  , setLoading]   = useState(true);
    const [error    , setError]     = useState(null);

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
                setError('Error al cargar el producto');
                console.error(`Error al cargar el producto: ${err}`);
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
    const onSelectedSize = useCallback((size) => {
        if (size.id_size === selectedSize?.id_size) return;
        setSelectedSize(size);
    }, [selectedSize]);

    const onSelectedColor = useCallback((color) => {
        if (color.id_variant === selectedColor?.id_variant) return;
        setSelectedColor(color);
    }, [selectedColor]);

    const onChangeQuantity = useCallback((event) => {
        const q = parseInt(event.target.value);
        (q > 0 && q <= selectedColor.stock)
            ? setQuantity(q)
            : alert('La cantidad ingresada no puede ser mayor a la que figura en el stock. En caso de desear realizar un pedido que supere la cantidad en stock por favor comuníquese con nosotros por nuestros canales.');
    }, [selectedColor]);

    

    const onAddToCart = () => {
        if (!selectedColor || !selectedSize) return;

        addToCart(selectedColor.id_variant, quantity);
        setQuantity(1);
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