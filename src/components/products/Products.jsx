import { useContext } from 'react';
import { DataContext } from '../../contexts/Data.jsx';
import { createTitle } from '../../utils/createTitle.jsx';
import ProductsTabItem from './ProductsTabItem.jsx';
import ProductCards from './ProductCards.jsx';

import './Products.scss';

const Products = () => {

    const { arrProducts } = useContext(DataContext);
            
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
                            {
                                arrProducts.map(({ id, cards, images }, i) => {
                                    const isActive = i === 0 ? true : false;
                                    return (
                                        id !== 'Próximamente'
                                            ? 
                                                (
                                                    <div key={id} id={id} className={`tab-pane fade show${isActive ? ' active' : ''}`} role="tabpanel" aria-labelledby={`${id}-tab`}>
                                                        <div className="row">
                                                            <ProductCards id={id} cards={cards} images={images} />
                                                        </div>
                                                    </div>
                                                ) 
                                            :
                                                (
                                                    <div key={id} id={id} className={`tab-pane fade show${isActive ? ' active' : ''}`} role="tabpanel" aria-labelledby={`${id}-tab`}>
                                                        <div className="row text-center py-5 my-5">
                                                            <h1>{id}</h1>
                                                        </div>
                                                    </div>
                                                )
                                    );
                                })
                            }
                        </div>
                        <div className='text-secondary'>*Este es nuestro catálogo, para poder realizar un pedido, consultar por stock, o solicitar precio mayorista, deberá comunicarse con nosotros por medio de nuestros canales.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Products;