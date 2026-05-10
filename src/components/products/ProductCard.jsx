import { Link } from 'react-router-dom';
import useMainData from '../../hooks/useMainData';
import './ProductCard.scss';

const ProductCard = ({ product, idx }) => {
    const { id_product, cat_name, product_name, short_desc, min_price, size_count, color_count, main_image_url } = product;
    const { PLACEHOLDER_IMG } = useMainData();
    return (
        <div key={`${cat_name}-${idx}`} className="col-12 col-md-6 col-lg-4">
            <div className="card product-card">
                <div className={`item active`}>
                    <img className="d-block w-100" 
                        src={main_image_url || PLACEHOLDER_IMG}
                        alt={product_name} 
                        onError={e => e.target.src = PLACEHOLDER_IMG }
                    />
                </div>
                <div className="card-body">
                    <div className="card-title">{product_name}</div>
                    <p className="card-text text-body-secondary">Precio desde: ${min_price.toLocaleString('es-ES')}.-</p>
                    <p className="card-text">{short_desc}</p>
                    <p className="card-text text-body-secondary">{size_count} talles en {color_count} colores</p>
                    <Link key={idx} to={`/productos/${id_product}`}>Ver detalles</Link>
                </div>
            </div>                
        </div>
    );
};
export default ProductCard;