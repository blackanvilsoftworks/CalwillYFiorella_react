import { Link } from 'react-router-dom';
import './ProductCards.scss';
import ProductCarousel from './ProductCarousel';

const ProductCard = ({ product, i }) => {
    const { id_product, category, product_name, short_desc, min_price, size_count, color_count, color_images } = product;
    return (
        <div key={`${category}-${i}`} className="col-12 col-md-6 col-lg-4">
            <div className="card product-card">
                {color_images && color_images.length > 0 
                    ? <ProductCarousel
                        key={i}
                        category={category}
                        images={color_images}
                        i={i}/>
                    : (
                        <div className={`item active`}>
                            <img className="d-block w-100" src='/assets/images/placeholder.png' />
                        </div>
                    )
                }
                <div className="card-body">
                    <div className="card-title">{product_name}</div>
                    <p className="card-text text-body-secondary">Precio: ${min_price.toLocaleString('es-ES')}.-</p>
                    <p className="card-text">{short_desc}</p>
                    <p className="card-text text-body-secondary">{size_count} talles en {color_count} colores</p>
                    <Link key={i} to={`/productos/${id_product}`}>Ver detalles</Link>
                </div>
            </div>                
        </div>
    );
};
export default ProductCard;