import { supabase } from '../config/supabase';

// ── Funciones para usuarios logueados ────────────────────────────────────────

/**
 * Obtener todos los ítems del carrito de un usuario desde la view enriquecida.
 * @param {string} userId - UUID del usuario
 * @returns {Promise<Array|null>} Array de ítems con datos enriquecidos, o null si error
 */
export const getCartByUser = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('v_cart_complete')
            .select('*')
            .eq('id_user', userId);

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching cart by user:', error);
        return null;
    }
};

/**
 * Insertar o actualizar un ítem en el carrito del usuario (upsert por id_user + id_variant).
 * Si el registro ya existe, actualiza la quantity. Si no, lo inserta.
 * @param {string} userId - UUID del usuario
 * @param {string} id_variant - UUID de la variante
 * @param {number} quantity - Cantidad
 * @returns {Promise<Object|null>} Ítem insertado/actualizado, o null si error
 */
export const upsertCartItem = async (userId, id_variant, quantity) => {
    try {
        const { data, error } = await supabase
            .from('cart')
            .upsert(
                { id_user: userId, id_variant, quantity },
                { onConflict: 'id_user,id_variant' }
            )
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error upserting cart item:', error);
        return null;
    }
};

/**
 * Actualizar la cantidad de un ítem del carrito del usuario.
 * @param {string} userId - UUID del usuario
 * @param {string} id_variant - UUID de la variante
 * @param {number} newQuantity - Nueva cantidad
 * @returns {Promise<null>} null si error
 */
export const updateCartItemQuantity = async (userId, id_variant, newQuantity) => {
    try {
        const { error } = await supabase
            .from('cart')
            .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
            .eq('id_user', userId)
            .eq('id_variant', id_variant);

        if (error) throw error;
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        return null;
    }
};

/**
 * Eliminar un ítem del carrito del usuario.
 * @param {string} userId - UUID del usuario
 * @param {string} id_variant - UUID de la variante
 * @returns {Promise<null>} null si error
 */
export const removeCartItem = async (userId, id_variant) => {
    try {
        const { error } = await supabase
            .from('cart')
            .delete()
            .eq('id_user', userId)
            .eq('id_variant', id_variant);

        if (error) throw error;
    } catch (error) {
        console.error('Error removing cart item:', error);
        return null;
    }
};

/**
 * Eliminar todos los ítems del carrito del usuario.
 * @param {string} userId - UUID del usuario
 * @returns {Promise<null>} null si error
 */
export const clearUserCart = async (userId) => {
    try {
        const { error } = await supabase
            .from('cart')
            .delete()
            .eq('id_user', userId);

        if (error) throw error;
    } catch (error) {
        console.error('Error clearing user cart:', error);
        return null;
    }
};

// ── Funciones para usuarios anónimos ─────────────────────────────────────────

/**
 * Obtener datos actualizados de variantes por sus IDs desde la view pública.
 * No requiere autenticación.
 * @param {string[]} variantIds - Array de UUIDs de variantes
 * @returns {Promise<Array|null>} Array de variantes con sus datos, o null si error
 */
export const getVariantsByIds = async (variantIds) => {
    try {
        const { data, error } = await supabase
            .from('v_variant_public')
            .select('*')
            .in('id_variant', variantIds);

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching variants by ids:', error);
        return null;
    }
};