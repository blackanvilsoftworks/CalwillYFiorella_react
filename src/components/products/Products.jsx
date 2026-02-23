import { 
    // useContext,
    useState, 
    useEffect
 } from 'react';
// import { DataContext } from '../../contexts/Data.jsx';
import { createTitle } from '../../utils/createTitle.jsx';
// import ProductsTabItem from './ProductsTabItem.jsx';
import ProductCard from './ProductCard.jsx';

import { 
    getActiveCategories,
    // getAllProducts, 
    getProductsForHomepage 
} from '../../services/productService.js'

import './Products.scss';
import Loader from '../loader/Loader.jsx';


const Products = () => {

    // const { arrProducts } = useContext(DataContext);
    
    const [products     , setProducts   ] = useState([]);
    const [categories   , setCategories ] = useState([]);
    const [loading      , setLoading    ] = useState(true);
    const [error        , setError      ] = useState(null);
    const [category     , setCategory   ] = useState(0);

    const renderProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const [categoriesData, productsData] = await Promise.all([
                getActiveCategories(),
                getProductsForHomepage(category)
            ])

            setCategories(categoriesData);
            setProducts(productsData);
        } catch (err) {
            setError(`Error. Por favor, intentá de nuevo. (${err.message})`);
            console.error(err);
        } finally { 
            setLoading(false); 
        }
    }

    const changeCategory = (e) => setCategory(e.target.name);

    useEffect(() => {
        renderProducts();
    }, [category]);

    useEffect(() => {
        if (categories.length > 0 && !category) setCategory(categories[0].id_category);
    }, [categories]);

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
                        <ul id="productsTab" className="nav nav-pills justify-content-center mb-4" role="tablist">
                            {categories && categories.map(({ id_category, name, description }, i) => {
                                const isActive = i === 0 ? true : false;
                                return (
                                    <li key={name} className="nav-item" role="presentation">
                                        <button
                                            id={`${name}-tab`}
                                            name={id_category}
                                            className={`nav-link main-btn-style mx-1${isActive ? ' active': ''}`}
                                            data-bs-toggle="pill"
                                            data-bs-target={`#${name}`}
                                            aria-selected={isActive} 
                                            type="button"
                                            role="tab"
                                            style={{ width: 250 }}
                                            onClick={changeCategory}
                                        >Calzado para {description.charAt(0).toUpperCase() + description.slice(1).toLowerCase()}</button>
                                    </li>
                                )
                            })}
                        </ul>
                        <div id="productsTabContent" className="tab-content">
                            <div key={category} id={category} className={`tab-pane fade show active`} role="tabpanel" aria-labelledby={`${category}-tab`}>
                                <div className="row">
                                    {products && products.map((product, i) => (<ProductCard key={i} product={product} i={i} />))}
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