import { supabase } from '../config/supabase';

/**
 * Obtener todos los ítems del carrito de un usuario
 * @param {string} userId - UUID del usuario
 * @returns {Promise<Array>} Array de ítems del carrito
 */
export const getCartByUser = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('cart')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching cart by user:', error);
        throw error;
    }
};

/**
 * Insertar o actualizar un ítem en el carrito del usuario (upsert por user_id + id_variant)
 * @param {string} userId - UUID del usuario
 * @param {Object} cartItem - Ítem del carrito
 * @returns {Promise<Object>} Ítem insertado o actualizado
 */
export const addCartItem = async (user_id, cartItem) => {
    const { id_variant, product_name, variant_description, sku, price, quantity, image } = cartItem;
    try {
        const { data, error } = await supabase
            .from('cart')
            .upsert(
                {
                    user_id,
                    id_variant,
                    product_name,
                    variant_description,
                    sku,
                    price,
                    quantity,
                    image
                },
                { onConflict: 'user_id,id_variant' }
            )
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error adding cart item:', error);
        throw error;
    }
};

/**
 * Actualizar la cantidad de un ítem del carrito del usuario
 * @param {string} userId - UUID del usuario
 * @param {string} id_variant - UUID de la variante
 * @param {number} newQuantity - Nueva cantidad
 */
export const updateCartItemQuantity = async (userId, id_variant, newQuantity) => {
    try {
        const { error } = await supabase
            .from('cart')
            .update({ quantity: newQuantity })
            .eq('user_id', userId)
            .eq('id_variant', id_variant);

        if (error) throw error;
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        throw error;
    }
};

/**
 * Eliminar un ítem del carrito del usuario
 * @param {string} userId - UUID del usuario
 * @param {string} id_variant - UUID de la variante
 */
export const removeCartItem = async (userId, id_variant) => {
    try {
        const { error } = await supabase
            .from('cart')
            .delete()
            .eq('user_id', userId)
            .eq('id_variant', id_variant);

        if (error) throw error;
    } catch (error) {
        console.error('Error removing cart item:', error);
        throw error;
    }
};

/**
 * Eliminar todos los ítems del carrito del usuario
 * @param {string} userId - UUID del usuario
 */
export const clearUserCart = async (userId) => {
    try {
        const { error } = await supabase
            .from('cart')
            .delete()
            .eq('user_id', userId);

        if (error) throw error;
    } catch (error) {
        console.error('Error clearing user cart:', error);
        throw error;
    }
};