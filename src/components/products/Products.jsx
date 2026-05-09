import { 
    useState, 
    useEffect
 } from 'react';
import { createTitle } from '../../utils/createTitle.jsx';
import ProductCard from './ProductCard.jsx';

import { 
    getActiveCategories,
    getProductsForHomepage
} from '../../services/productService.js'

import './Products.scss';
import Loader from '../loader/Loader.jsx';
import { capitalize } from '../../utils/helpers.js';

const Products = () => {
    const [products     , setProducts   ] = useState([]);
    const [categories   , setCategories ] = useState([]);
    const [loading      , setLoading    ] = useState(true);
    const [error        , setError      ] = useState(null);
    const [category     , setCategory   ] = useState(0);

    const changeCategory = (e) => setCategory(e.target.value);

    useEffect(() => {
        // Rendering products.
        (async () => {
            try {
                setLoading(true);
                setError(null);
    
                const [categoriesData, productsData] = await Promise.all([
                    getActiveCategories(),
                    getProductsForHomepage(category)
                ]);
    
                setCategories(categoriesData);
                setProducts(productsData);
            } catch (err) {
                setError(`Error. Por favor, intentá de nuevo. (${err.message})`);
                console.error(err);
            } finally { 
                setLoading(false); 
            }
        })();
    }, [category]);

    useEffect(() => {
        if (categories.length > 0 && !category) setCategory(categories[0].id_category);
    }, [categories, category]);

    if (error)      return <div className="error">{error}</div>
    if (loading)    return <Loader />

    return (
        <div id="products_container" className="products_container container py-3 py-sm-4 py-md-5 rounded-3">
            <div className="row justify-content-center">
                <div className="col-10 col-lg-12 px-lg-5">
                    <div className="row">
                        <h2 className="text-center">
                            { createTitle('Nuestros Productos', 'bi bi-cart') }
                        </h2>
                        <div className='d-flex justify-content-center align-items-center my-4'>
                            <select 
                                className="main-btn-style text-center" 
                                style={{ width: 400, cursor: 'pointer' }}
                                value={category}
                                onChange={changeCategory}
                                disabled={loading}
                            >
                                {categories && categories.map(({ id_category, description }) => (
                                    <option
                                        key={id_category}
                                        value={id_category}
                                    >Calzado para {capitalize(description)}</option>
                                ))}
                            </select>
                        </div>
                        <div id="productsTabContent" className="tab-content">
                            <div key={category} id={category} className={`tab-pane fade show active`} role="tabpanel" aria-labelledby={`${category}-tab`}>
                                <div className="row">
                                    {products && products.map((product, idx) => (<ProductCard key={idx} product={product} idx={idx} />))}
                                    {products.length === 0 && (<p className="no-products">No hay productos disponibles en esta categoría.</p>)}
                                </div>
                            </div>
                        </div>
                        <div className='text-secondary'>*Este es nuestro catálogo, para poder realizar un pedido, consultar por stock, o solicitar precio mayorista, deberá comunicarse con nosotros por medio de nuestros canales.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Products;