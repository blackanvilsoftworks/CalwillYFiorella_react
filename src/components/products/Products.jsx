import { 
    useContext,
    useState, 
    useEffect
 } from 'react';
import { DataContext } from '../../contexts/Data.jsx';
import { createTitle } from '../../utils/createTitle.jsx';
import ProductsTabItem from './ProductsTabItem.jsx';
// import ProductCards from './ProductCards.jsx';

import { 
    getAllProducts, 
    // getProductsByCategory 
} from '../../services/productService.js'
// '../../services/productService.js'

import './Products.scss';

const Products = () => {

    const { arrProducts } = useContext(DataContext);








    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    // const [selectedCategory, setSelectedCategory] = useState('all')

    // useEffect(() => {
    //     loadProducts()
    // }, [selectedCategory])
    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async () => {
        try {
            setLoading(true)
            setError(null)

            let data = await getAllProducts();
            // if (selectedCategory === 'all') {
            //     data = await getAllProducts()
            // } else {
            //     data = await getProductsByCategory(selectedCategory)
            // }

            setProducts(data)
        } catch (err) {
            setError(`Error al cargar los productos. Por favor, intentá de nuevo. (${err.message})`)
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div className="loading">Cargando productos...</div>
    if (error) return <div className="error">{error}</div>









            
    return (
        <div id="products_container" className="products_container container py-3 py-sm-4 py-md-5 rounded-3">
            <div className="row justify-content-center">
                <div className="col-10 col-lg-12 px-lg-5">
                    <div className="row">
                        <h2 className="text-center">
                            { createTitle('Nuestros Productos', 'bi bi-cart') }
                        </h2>
                        <ul id="productsTab" className="nav nav-pills justify-content-center mb-4" role="tablist">
                            { arrProducts ? <ProductsTabItem items={arrProducts} /> : null }
                        </ul>
                        <div id="productsTabContent" className="tab-content">




                        {/* Grid de productos */}
                        <div className="products-grid">
                        {products.map(product => (
                            <div key={product.id_product} className="product-card">
                            <img
                                src={product.main_image || '/assets/images/placeholder.png'}
                                alt={product.name_product}
                            />
                            <h3>{product.name_product}</h3>
                            <p className="description">{product.description}</p>
                            <p className="price">${product.price}</p>
                            <p className="stock">Stock: {product.stock} unidades</p>
                            <button className="add-to-cart">Agregar al carrito</button>
                            </div>
                        ))}
                        </div>

                        {products.length === 0 && (
                        <p className="no-products">No hay productos disponibles en esta categoría.</p>
                        )}




















                            {/* {
                                // arrProducts ? 
                                arrProducts.map(({ id, cards, images }, i) => {
                                    const isActive = i === 0 ? true : false;
                                    return (
                                        <div key={id} id={id} className={`tab-pane fade show${isActive ? ' active' : ''}`} role="tabpanel" aria-labelledby={`${id}-tab`}>
                                            <div className="row">
                                                <ProductCards id={id} cards={cards} images={images} />
                                            </div>
                                        </div>
                                    );
                                })
                                // : (
                                //     <div id="placeholder" className="tab-pane fade show active" role="tabpanel" aria-labelledby="placeholder-tab">
                                //         <div className="row">
                                //             <div className="col-12 col-md-6 col-lg-4">    
                                //                 <div className="card product-card" aria-hidden="true">
                                //                     <div className="carousel slide">
                                //                         <div className="carousel-inner">
                                //                             <div className="carousel-item active">
                                //                                 <img src="/assets/images/placeholder.png" className="d-block w-100" alt="Cargando..." />
                                //                             </div>
                                //                         </div> 
                                //                     </div> 
                                //                     <div className="card-body">
                                //                         <div className="card-title placeholder-glow"><span className="placeholder col-6"></span></div>
                                //                         <p className="card-text placeholder-glow">
                                //                             <span className="placeholder col-12"></span>
                                //                             <span className="placeholder col-12"></span>
                                //                             <span className="placeholder col-12"></span>
                                //                             <span className="placeholder col-12"></span>
                                //                         </p>
                                //                     </div>
                                //                 </div>
                                //             </div>
                                //         </div>
                                //     </div>
                                // )
                            } */}

                        </div>
                        <div className='text-secondary'>*Este es nuestro catálogo, para poder realizar un pedido, consultar por stock, o solicitar precio mayorista, deberá comunicarse con nosotros por medio de nuestros canales.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Products;