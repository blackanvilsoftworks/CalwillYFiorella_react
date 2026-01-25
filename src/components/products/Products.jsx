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
                            { arrProducts ? <ProductsTabItem items={arrProducts} /> : null }
                        </ul>
                        <div id="productsTabContent" className="tab-content">
                            {
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
                            }

                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Products;