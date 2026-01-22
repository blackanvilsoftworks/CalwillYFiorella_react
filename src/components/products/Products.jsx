import { useContext } from 'react';
import { DataContext } from '../../contexts/Data.jsx';
import { createTitle } from '../../utils/createTitle.jsx';
import ProductsTabItem from './ProductsTabItem.jsx';
import ProductCards from './ProductCards.jsx';

import './Products.scss';

const Products = () => {

    const { objContainers, arrProducts } = useContext(DataContext);
            
    const data = objContainers.products;

    return (
        <div id={data.id} className={data.className}>
            <div className="row justify-content-center">
                <div className="col-10 col-lg-12 px-lg-5">
                    <div className="row">
                        <h2 className="text-center">
                            { createTitle(data.title, data.icon) }
                        </h2>
                        <div className='text-end'>*Consultar por precio mayorista.</div>
                        <ul id="productsTab" className="nav nav-pills justify-content-center mb-4" role="tablist">
                            <ProductsTabItem items={arrProducts} />
                        </ul>
                        <div id="productsTabContent" className="tab-content">
                            {
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
                            }
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Products;