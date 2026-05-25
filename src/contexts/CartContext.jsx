import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext.jsx';
import {
    getCartByUser,
    addCartItem,
    updateCartItemQuantity,
    removeCartItem,
    clearUserCart
} from '../services/cartService';

const CartContext = createContext();

const CART_STORAGE_KEY = 'c&f_cart_items';

const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);

    // Hydratation
    useEffect(() => {
        (async () => {
            if (user) {
                // if user exists, load cart from Supabase
                try {
                    const items = await getCartByUser(user.id);
                    setCartItems(items);
                } catch (err) {
                    console.error(`Error cargando el carrito desde Supabase: ${err}`);
                }
            } else {
                // No user, load from localStorage
                try {
                    const stored = localStorage.getItem(CART_STORAGE_KEY);
                    setCartItems(stored ? JSON.parse(stored) : []);
                } catch (err) {
                    console.error(`Error cargando el carrito desde localStorage: ${err}`);
                    setCartItems([]);
                }
            }
        })();
    }, [user]);

    // Only persist cart items in localStorage if there is not a user logged in
    useEffect(() => { if (!user) localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems)); }, [cartItems, user]);

    /**
     * Agrega un ítem al carrito. Si ya existe el id_variant, suma la cantidad.
     * @param {Object} cartItem - { id_variant, product_name, variant_description, sku, price, quantity, image }
     */
    const addToCart = async (cartItem) => {
        const existing = cartItems.find(i => i.id_variant === cartItem.id_variant);
        let updatedItems;

        if (existing) {
            const mergedQuantity = existing.quantity + cartItem.quantity;
            updatedItems = cartItems.map(i =>
                i.id_variant === cartItem.id_variant
                    ? { ...i, quantity: mergedQuantity }
                    : i
            );

            if (user) {
                try {
                    await updateCartItemQuantity(user.id, cartItem.id_variant, mergedQuantity);
                } catch (err) {
                    console.error(`Error actualizando cantidad en Supabase: ${err}`);
                }
            }
        } else {
            updatedItems = [...cartItems, cartItem];

            if (user) {
                try {
                    await addCartItem(user.id, cartItem);
                } catch (err) {
                    console.error(`Error agregando ítem al carrito en Supabase: ${err}`);
                }
            }
        }

        setCartItems(updatedItems);
    };

    /**
     * Updates the quantity of an item. Min:1. Max:99 (for now)
     * @param {string} id_variant
     * @param {number} newQuantity
     */
    const updateQuantity = async (id_variant, newQuantity) => {
        // TODO: validar contra stock real
        const clampedQuantity = Math.max(1, Math.min(99, newQuantity));

        const updatedItems = cartItems.map(i =>
            i.id_variant === id_variant
                ? { ...i, quantity: clampedQuantity }
                : i
        );
        setCartItems(updatedItems);

        if (user) {
            try {
                await updateCartItemQuantity(user.id, id_variant, clampedQuantity);
            } catch (err) {
                console.error(`Error actualizando cantidad en Supabase: ${err}`);
            }
        }
    };

    /**
     * Elimina un ítem del carrito por id_variant.
     * @param {string} id_variant
     */
    const removeItem = async (id_variant) => {
        const updatedItems = cartItems.filter(i => i.id_variant !== id_variant);
        setCartItems(updatedItems);

        if (user) {
            try {
                await removeCartItem(user.id, id_variant);
            } catch (err) {
                console.error(`Error eliminando ítem del carrito en Supabase: ${err}`);
            }
        }
    };

    /**
     * Vacía completamente el carrito.
     */
    const clearCart = async () => {
        setCartItems([]);

        if (user) {
            try {
                await clearUserCart(user.id);
            } catch (err) {
                console.error(`Error vaciando el carrito en Supabase: ${err}`);
            }
        }
    };

    // ── Total del carrito ─────────────────────────────────────────────────────
    const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const value = {
        cartItems,
        cartTotal,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
