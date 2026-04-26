import ProductCarousel from "./ProductCarousel";
import './ProductCards.scss';

const ProductCards = ({ id, cards }) => {
    return cards.map(({ product, description,features, price, images }, i) => {
        return (
            <div key={`${id}-${i}`} className="col-12 col-md-6 col-lg-4">
                <div className="card product-card">                    
                    <ProductCarousel 
                        id={id} 
                        images={images} 
                        i={i} 
                    />
                    <div className="card-body">
                        <div className="card-title">{product}</div>
                        <p className="card-text text-body-secondary">Precio: ${price.toLocaleString('es-ES')}.-</p>
                        <p className="card-text">{description}</p>
                        <ul className="list-group list-group-flush">
                            {features.map((feature, i) => (
                                <li key={`${id}-${i}`} className="list-group-item">
                                    <i className="bi bi-check-circle"></i> {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>                
            </div>
        );
    });
};
export default ProductCards;