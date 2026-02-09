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


const Products = () => {

    // const { arrProducts } = useContext(DataContext);
    
    const [products     , setProducts   ] = useState([]);
    const [categories   , setCategories ] = useState([]);
    const [loading      , setLoading    ] = useState(true);
    const [error        , setError      ] = useState(null);
    const [category     , setCategory   ] = useState('');

    const renderProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const arrCategories = await getActiveCategories();
            setCategories(arrCategories);

            const arrProducts = await getProductsForHomepage(category);
            setProducts(arrProducts);
        } catch (err) {
            setError(`Error. Por favor, intentá de nuevo. (${err.message})`);
            console.error(err);
        } finally { setLoading(false); }
    }

    const changeCategory = (e) => setCategory(e.target.name);

    useEffect(() => {
        renderProducts();
    }, [category]);

    useEffect(() => {
        if (categories.length > 0 && !category) setCategory(categories[0].description);
    }, [categories]);

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
                            {!loading
                                ? categories.map(({ name, description }, i) => {
                                    const isActive = i === 0 ? true : false;
                                    return (
                                        <li key={name} className="nav-item" role="presentation">
                                            <button
                                                id={`${name}-tab`}
                                                name={name}
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
                                })
                                : (
                                    <li className="nav-item">
                                        <button
                                            className={'nav-link main-btn-style mx-1'}
                                            type="button"
                                            style={{ width: 250 }}
                                        >Cargando...</button>
                                    </li>
                                )
                            }
                        </ul>
                        <div id="productsTabContent" className="tab-content">
                            <div key={category} id={category} className={`tab-pane fade show active`} role="tabpanel" aria-labelledby={`${category}-tab`}>
                                <div className="row">
                                    {!loading
                                        ? products.map((product, i) => (<ProductCard key={i} product={product} i={i} />))
                                        : (
                                            <div id="placeholder" className="tab-pane fade show active" role="tabpanel" aria-labelledby="placeholder-tab">
                                                <div className="row">
                                                    <div className="col-12 col-md-6 col-lg-4">    
                                                        <div className="card product-card" aria-hidden="true">
                                                            <div className="carousel slide">
                                                                <div className="carousel-inner">
                                                                    <div className="carousel-item active">
                                                                        <img src="/assets/images/placeholder.png" className="d-block w-100" alt="Cargando..." />
                                                                    </div>
                                                                </div> 
                                                            </div> 
                                                            <div className="card-body">
                                                                <div className="card-title placeholder-glow"><span className="placeholder col-6"></span></div>
                                                                <p className="card-text placeholder-glow">
                                                                    <span className="placeholder col-12"></span>
                                                                    <span className="placeholder col-12"></span>
                                                                    <span className="placeholder col-12"></span>
                                                                    <span className="placeholder col-12"></span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
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