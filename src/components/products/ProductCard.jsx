import ProductCarousel from "./ProductCarousel";
import './ProductCards.scss';

const ProductCard = ({ product, i }) => {
    const { category, name_product, description, price, main_image } = product;
    // return cards.map(({ product, description, price, images }, i) => {
        return (
            <div key={`${category}-${i}`} className="col-12 col-md-6 col-lg-4">
                <div className="card product-card">                    
                    <ProductCarousel 
                        category={category}
                        images={[main_image]}
                        i={i} 
                    />
                    <div className="card-body">
                        <div className="card-title">{name_product}</div>
                        <p className="card-text text-body-secondary">Precio: ${price.toLocaleString('es-ES')}.-</p>
                        <p className="card-text">{description}</p>
                        <button className="add-to-cart">Agregar al carrito</button>
                    </div>
                </div>                
            </div>
        );
    // });
};
export default ProductCard;
// .toLocaleString('es-ES')