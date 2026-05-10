import useMainData from '../../hooks/useMainData';
import './ProductCarousel.scss';

const ProductCarousel = ({ images, id_size, id_color }) => {
    const { placeholder } = useMainData();

    const carouselBtns = [
        {
            desc: 'Anterior',
            slide: 'prev'
        },
        {
            desc: 'Siguiente',
            slide: 'next'
        }
    ];

    return (
        <div id={`carousel-${id_size}-${id_color}`} className="carousel slide">
            <div className="carousel-inner">
                {images
                    ? images.map((image, i) => (
                        <div key={image.id_image} className={`carousel-item${i === 0 ? ' active' : ''}`}>
                            <img 
                                className="d-block w-100 rounded"
                                alt={image?.produc_name}
                                src={image?.image_url}
                                onError={e => e.target.src = placeholder}
                            />
                        </div>))
                    : (<img className="d-block w-100" src={placeholder} />)
                }
            </div>
            {carouselBtns.map(({ desc, slide }) => (
                <button key={desc} className={`carousel-control-${slide}`} data-bs-target={`#carousel-${id_size}-${id_color}`} data-bs-slide={slide} type="button">
                    <span className={`carousel-control-${slide}-icon`}></span>
                    <span className="visually-hidden">{desc}</span>
                </button>
            ))}
        </div>
    );
};
export default ProductCarousel;