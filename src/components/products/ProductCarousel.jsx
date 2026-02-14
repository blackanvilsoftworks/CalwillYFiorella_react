// import { useContext } from 'react';
// import { DataContext } from '../../contexts/Data.jsx';

import './ProductCarousel.scss';

const ProductCarousel = ({ images, size, color }) => {
    // const { imagesPath } = useContext(DataContext);

    return (
        <div id={`carousel-${size}-${color}`} className="carousel slide">
            <div className="carousel-inner">
                {
                    images.map((image, i) => {
                        return (
                            <div key={image.id_image} className={`carousel-item${i === 0 ? ' active' : ''}`}>
                                <img 
                                    className="d-block w-100" 
                                    src={image?.image_url} 
                                    onError={e => e.target.src = '/assets/images/placeholder.png'}
                                />
                            </div>
                        );
                    })
                }
            </div>            
            <button className="carousel-control-prev" data-bs-target={`#carousel-${size}-${color}`} data-bs-slide="prev" type="button">
                <span className="carousel-control-prev-icon"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" data-bs-target={`#carousel-${size}-${color}`} data-bs-slide="next" type="button">
                <span className="carousel-control-next-icon"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};
export default ProductCarousel;