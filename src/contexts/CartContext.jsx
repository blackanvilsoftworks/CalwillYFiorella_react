import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from './AuthContext.jsx';
import * as cartService from '../services/cartService';

const CartContext = createContext();

const _CART_STORAGE_KEY = 'c&f_cart_keys';

const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);

    // Capa 1: datos mínimos persistidos — [{ id_variant, quantity }, ...]
    const [cartKeys, setCartKeys] = useState([]);

    // Capa 2: datos hidratados desde Supabase — array de ítems enriquecidos
    const [cartItems, setCartItems] = useState([]);

    const [loading, setLoading] = useState(false);

    // ── Hidratación ──────────────────────────────────────────────────────────
    const hydrateCart = useCallback(async () => {
        setLoading(true);

        try {
            if (user) {
                // Usuario logueado: ignorar localStorage, cargar desde Supabase
                const items = await cartService.getCartByUser(user.id);
                if (items !== null) {
                    setCartItems(items);
                    // Sincronizar cartKeys con los datos de Supabase
                    setCartKeys(items.map(i => ({ id_variant: i.id_variant, quantity: i.quantity })));
                }
            } else {
                // Sin usuario: leer keys del localStorage
                let storedKeys = [];
                try {
                    const raw = localStorage.getItem(_CART_STORAGE_KEY);
                    storedKeys = raw ? JSON.parse(raw) : [];
                } catch {
                    storedKeys = [];
                }

                if (!storedKeys.length) {
                    setCartKeys([]);
                    setCartItems([]);
                    return;
                }

                setCartKeys(storedKeys);

                const variantIds = storedKeys.map(k => k.id_variant);
                const variants = await cartService.getVariantsByIds(variantIds);

                if (variants === null) return;

                // Combinar datos de la view con quantities del localStorage
                const hydrated = variants.map(variant => {
                    const keyEntry = storedKeys.find(k => k.id_variant === variant.id_variant);
                    const quantity = keyEntry?.quantity ?? 1;
                    return {
                        ...variant,
                        quantity,
                        subtotal     : variant.price * quantity,
                        has_stock    : variant.stock >= quantity,
                    };
                });

                setCartItems(hydrated);
            }
        } finally {
            setLoading(false);
        }
    }, [user]);

    // Re-hidratar cuando cambia el estado de autenticación
    useEffect(() => {
        hydrateCart();
    }, [hydrateCart]);

    // ── Métodos expuestos ────────────────────────────────────────────────────

    /**
     * Agrega un ítem al carrito. Si ya existe el id_variant, suma la cantidad.
     * @param {string} id_variant
     * @param {number} quantity
     */
    const addToCart = useCallback(async (id_variant, quantity) => {
        const existing = cartKeys.find(k => k.id_variant === id_variant);
        const newQuantity = existing ? existing.quantity + quantity : quantity;

        if (user) {
            await cartService.upsertCartItem(user.id, id_variant, newQuantity);
        } else {
            let updatedKeys;
            if (existing) {
                updatedKeys = cartKeys.map(k =>
                    k.id_variant === id_variant ? { ...k, quantity: newQuantity } : k
                );
            } else {
                updatedKeys = [...cartKeys, { id_variant, quantity }];
            }
            localStorage.setItem(_CART_STORAGE_KEY, JSON.stringify(updatedKeys));
        }

        await hydrateCart();
    }, [user, cartKeys, hydrateCart]);

    /**
     * Actualiza la cantidad de un ítem. Min: 1. Max: stock del ítem hidratado.
     * @param {string} id_variant
     * @param {number} newQuantity
     */
    const updateQuantity = useCallback(async (id_variant, newQuantity) => {
        if (newQuantity < 1) return;

        const hydrated = cartItems.find(i => i.id_variant === id_variant);
        if (hydrated && newQuantity > hydrated.stock) return;

        if (user) {
            await cartService.updateCartItemQuantity(user.id, id_variant, newQuantity);
        } else {
            const updatedKeys = cartKeys.map(k =>
                k.id_variant === id_variant ? { ...k, quantity: newQuantity } : k
            );
            localStorage.setItem(_CART_STORAGE_KEY, JSON.stringify(updatedKeys));
        }

        await hydrateCart();
    }, [user, cartKeys, cartItems, hydrateCart]);

    /**
     * Elimina un ítem del carrito.
     * @param {string} id_variant
     */
    const removeItem = useCallback(async (id_variant) => {
        if (user) {
            await cartService.removeCartItem(user.id, id_variant);
        } else {
            const updatedKeys = cartKeys.filter(k => k.id_variant !== id_variant);
            localStorage.setItem(_CART_STORAGE_KEY, JSON.stringify(updatedKeys));
        }

        await hydrateCart();
    }, [user, cartKeys, hydrateCart]);

    /**
     * Vacía completamente el carrito.
     */
    const clearCart = useCallback(async () => {
        if (user) {
            await cartService.clearUserCart(user.id);
        } else {
            localStorage.setItem(_CART_STORAGE_KEY, JSON.stringify([]));
        }

        setCartKeys([]);
        setCartItems([]);
    }, [user]);

    // ────────────────────────────────────────────────────────────────────────
    const value = {
        cartItems,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
