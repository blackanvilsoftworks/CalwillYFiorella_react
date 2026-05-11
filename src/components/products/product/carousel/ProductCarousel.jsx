
import CarouselImages from './CarouselImages';
import CarouselBtns from './CarouselBtns';
import useMainData from '../../../../hooks/useMainData';
import './ProductCarousel.scss';

const ProductCarousel = ({ images, id_size, id_color }) => {
    const { PLACEHOLDER_IMG } = useMainData();

    if (images.length === 0) return (
        <div className='carousel-item active'>
            <img 
                className="d-block w-100 rounded" 
                src={PLACEHOLDER_IMG} 
                alt='Imagen no disponible' 
                style={{width: '100%', height: '100%'}}
            />
        </div>
    );
    
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