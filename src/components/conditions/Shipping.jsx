import { useContext } from 'react';
import { DataContext } from '../../contexts/Data.jsx';
import { createTitle } from '../../utils/createTitle.jsx';
import './Shipping.scss';

const Shipping = () => {

    const { objDeliveryOptions } = useContext(DataContext);
            
    const ship = objDeliveryOptions;

    return (
        <div id="shipping_container" className="container pt-5 text-center">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10">
                    <div className="row mx-3 mx-sm-5 px-3">
                        <div className="col-md-12">
                            <h2 className="mb-4">
                                { createTitle('Opciones de Envío', 'bi bi-rocket-takeoff') }
                            </h2>
                        </div>
                        <div className="col-12 col-md-4 my-3 my-md-0 px-3">
                            <h4 className="subtitles">{ship.collect_in_store.subtitle}</h4>
                            { 
                                ship.collect_in_store.description.map((item, index) => (<p key={index}>{item}</p>))
                            }
                        </div>
                        <div className="col-12 col-md-4 mb-3 my-md-0 px-3">
                            <h4 className="subtitles">{ship.delivery_gba.subtitle}</h4>
                            { 
                                ship.delivery_gba.description.map((item, index) => (<p key={index}>{item}</p>))
                            }
                        </div>
                        <div className="col-12 col-md-4 my-md-0 px-3">
                            <h4 className="subtitles">{ship.delivery_country.subtitle}</h4>
                            { 
                                ship.delivery_country.description.map((item, index) => (<p key={index}>{item}</p>))
                            }
                        </div>
                        <div className="col-12 col-md-12 d-flex justify-content-center">
                            <div className="col-12 col-md-8 p-3 shipping_rules_container rounded-3">
                                <h4 className="subtitles">{ship.shipping_policies.subtitle}</h4>
                                { 
                                    ship.shipping_policies.description.map((item, index) => (<p key={index}>{item}</p>))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Shipping;