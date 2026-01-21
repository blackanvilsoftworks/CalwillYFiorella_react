import ProductCarousel from "./ProductCarousel";
import './ProductCards.scss';

const ProductCards = ({ id, cards }) => {
    return cards.map(({ title, description, images }, i) => {
        return (
            <div key={`${id}-${i}`} className="col-12 col-md-6 col-lg-4">
                <div className="card product-card">                    
                    <ProductCarousel 
                        id={id} 
                        images={images} 
                        i={i} 
                    />
                    <div className="card-body">
                        <div className="card-title">{title}</div>
                        <p className="card-text">{description}</p>
                    </div>                    
                </div>
            </div>
        );
    });
};
export default ProductCards;