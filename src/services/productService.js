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
export const getProductsForHomepage = async (category) => {
    try {
        const { data, error } = await supabase
        .from('v_products_complete')
        .select(`
            id_product,
            name_product,
            description,
            price,
            desc_category,
            main_image`)
        .eq('desc_status', 'active')
        .eq('desc_category', category)
        .order('created_at', { ascending: false })

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error fetching products by category:', error)
        throw error
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
            product_status (description)
        `)
        .eq('id_product', productId)
        .single()

        if (productError) throw productError

        // Obtener imágenes del producto
        const { data: images, error: imagesError } = await supabase
        .from('product_images')
        .select('*')
        .eq('id_product', productId)
        .eq('id_status', 1) // Solo imágenes activas
        .order('order_position', { ascending: true })

        if (imagesError) throw imagesError

        return {
        ...product,
        images
        }
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
            description,
            title`)
        .eq('status', 1)
        .order('created_at', { ascending: false })

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error fetching active categories:', error)
        throw error
    }
}