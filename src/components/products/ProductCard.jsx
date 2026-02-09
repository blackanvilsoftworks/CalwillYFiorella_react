import { Link } from 'react-router-dom';
import './ProductCards.scss';
// import ProductCarousel from './ProductCarousel';

const ProductCard = ({ product, i }) => {
    const { id_product, cat_name, product_name, short_desc, min_price, size_count, color_count, main_image_url } = product;
    return (
        <div key={`${cat_name}-${i}`} className="col-12 col-md-6 col-lg-4">
            <div className="card product-card">
                <div className={`item active`}>
                    <img className="d-block w-100" src={main_image_url} />
                </div>
                <div className="card-body">
                    <div className="card-title">{product_name}</div>
                    <p className="card-text text-body-secondary">Precio desde: ${min_price.toLocaleString('es-ES')}.-</p>
                    <p className="card-text">{short_desc}</p>
                    <p className="card-text text-body-secondary">{size_count} talles en {color_count} colores</p>
                    <Link key={i} to={`/productos/${id_product}`}>Ver detalles</Link>
                </div>
            </div>                
        </div>
    );
};
export default ProductCard;