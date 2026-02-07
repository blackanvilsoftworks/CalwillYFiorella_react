import { Link } from 'react-router-dom';
import './ProductCards.scss';

const ProductCard = ({ product, i }) => {
    const { id_product, desc_category, name_product, description, price, main_image } = product;
    return (
        <div key={`${desc_category}-${i}`} className="col-12 col-md-6 col-lg-4">
            <div className="card product-card">   
                <div className={`item active`}>                 
                    <img className="d-block w-100" src={main_image || '/assets/images/placeholder.png'} />
                </div>
                <div className="card-body">
                    <div className="card-title">{name_product}</div>
                    <p className="card-text text-body-secondary">Precio: ${price.toLocaleString('es-ES')}.-</p>
                    <p className="card-text">{description}</p>
                    <Link key={i} to={`/productos/${id_product}`}>Ver detalles</Link>
                </div>
            </div>                
        </div>
    );
};
export default ProductCard;