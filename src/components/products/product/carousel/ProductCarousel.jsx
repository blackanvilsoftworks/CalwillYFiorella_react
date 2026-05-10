
import CarouselImages from './CarouselImages';
import CarouselBtns from './CarouselBtns';
import './ProductCarousel.scss';

const ProductCarousel = ({ images, id_size, id_color }) => {
    return (
        <div id={`carousel-${id_size}-${id_color}`} className="carousel slide">
            <div className="carousel-inner">
                <CarouselImages images={images} />
            </div>
            <CarouselBtns id_size={id_size} id_color={id_color} />
        </div>
    );
};
export default ProductCarousel;