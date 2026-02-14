import { supabase } from '../config/supabase'



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* VIEW V_PRODUCTS_COMPLETE */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
  * Obtener productos por categoría con valores mínimos solo para hompage
  * @param {string} category - 'children' || 'men' || 'women'
  * @returns {Promise<Array>} Array de productos
 */
export const getProductsForHomepage = async (id_category) => {
    try {
        const { data, error } = await supabase
        .from('v_products_complete')
        .select(`
            id_product,
            product_name,
            short_desc,
            min_price,
            cat_name,
            size_count,
            color_count,
            main_image_url`)
        .eq('status', 'A')
        .eq('id_category', id_category)
        .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
}

// /**
//   * Obtener productos por categoría para panel del administrador
//   * @param {string} category
//   * @returns {Promise<Array>} Array de productos
//  */
// export const getProductsForAdmin = async (category) => {
//     try {
//         const { data, error } = await supabase
//         .from('v_products_complete')
//         .select('*')
//         .eq('status', 'active') // Tendría que traer incluso los inactivos para que pueda gestionarlos también
//         .eq('category', category)
//         .order('created_at', { ascending: false })

//         if (error) throw error
//         return data
//     } catch (error) {
//         console.error('Error fetching products by category:', error)
//         throw error
//     }
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* VIEW V_VARIANTS_BY_SIZE */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
  * Obtener talles activos por producto
  * @param {string} category - 'children' || 'men' || 'women'
  * @returns {Promise<Array>} Array de productos
 */
export const getVariantsBySize = async (id_product) => {
    try {
        const { data, error } = await supabase
        .from('v_variants_by_size')
        .select(`
            id_size,
            size,
            sort_order,
            size_description`)
        // .eq('status', 'A')
        .eq('id_product', id_product)
        .order('sort_order', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching variants by size:', error);
        throw error;
    }
}


/**
 * Obtener información completa del producto para la página de detalle
 * @param {string} productId - UUID del producto
 * @returns {Promise<Object>} Producto con metadata de variantes
 */
export const getProductDetail = async (productId) => {
    try {
        const { data, error } = await supabase
            .from('v_product_detail')
            .select('*')
            .eq('id_product', productId)
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error fetching product detail:', error)
        throw error
    }
}

/**
 * Obtener talles disponibles con sus colores para un producto
 * Cada talle ya viene con available_colors embebido (no hace falta query extra para colores)
 * @param {string} productId - UUID del producto
 * @returns {Promise<Array>} Array de talles con colores anidados
 */
export const getSizesByProduct = async (productId) => {
    try {
        const { data, error } = await supabase
            .from('v_variants_by_size')
            .select('*')
            .eq('id_product', productId)
            .order('sort_order', { ascending: true })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error fetching sizes by product:', error)
        throw error
    }
}

/**
 * Obtener imágenes de una variante específica (para carousel)
 * @param {string} variantId - UUID de la variante
 * @returns {Promise<Array>} Array de imágenes ordenadas por order_position
 */
export const getVariantImages = async (variantId) => {
    try {
        const { data, error } = await supabase
            .from('v_variant_images')
            .select('id_image, image_url, order_position')
            .eq('id_variant', variantId)
            .order('order_position', { ascending: true })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error fetching variant images:', error)
        throw error
    }
}









////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* CONSULTAS SIN VIEWS */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
  * Obtener producto por ID con todas sus imágenes
  * @param {string} productId - UUID del producto
  * @returns {Promise<Object>} Producto con imágenes
 */
export const getProductById = async (productId) => {
    try {
        // Obtener producto
        const { data: product, error: productError } = await supabase
        .from('products')
        .select(`
            *,
            categories (description),
            status (description)
        `)
        .eq('id_product', productId)
        .single()

        if (productError) throw productError

        // // Obtener imágenes del producto
        // const { data: images, error: imagesError } = await supabase
        // .from('product_images')
        // .select('*')
        // .eq('id_product', productId)
        // .eq('id_status', 1) // Solo imágenes activas
        // .order('order_position', { ascending: true })

        // if (imagesError) throw imagesError

        return product;
        // {
        // ...product,
        // // images
        // }
    } catch (error) {
        console.error('Error fetching product:', error)
        throw error
    }
}

/**
  * Obtener productos por categoría con valores mínimos solo para hompage
  * @returns {Promise<Array>} Array de productos
 */
export const getActiveCategories = async () => {
    try {
        const { data, error } = await supabase
        .from('categories')
        .select(`
            id_category,
            name,
            description`)
        .eq('cod_status', 'A')
        .order('created_at', { ascending: false })

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error fetching active categories:', error)
        throw error
    }
}