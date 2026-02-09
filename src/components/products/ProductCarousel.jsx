// import { useContext } from 'react';
// import { DataContext } from '../../contexts/Data.jsx';

import './ProductCarousel.scss';

const ProductCarousel = ({cat_name, images, i }) => {
    // const { imagesPath } = useContext(DataContext);

    return (
        <div id={`carousel-${cat_name}-product${i+1}`} className="carousel slide">
            <div className="carousel-inner">
                {
                    images.map((image, j) => {
                        return (
                            <div key={`${cat_name}-${i}-${j}`} className={`carousel-item${j === 0 ? ' active' : ''}`}>
                                <img className="d-block w-100" src={image?.image_url || '/assets/images/placeholder.png'} />
                            </div>
                        );
                    })
                }
            </div>            
            <button className="carousel-control-prev" data-bs-target={`#carousel-${cat_name}-product${i+1}`} data-bs-slide="prev" type="button">
                <span className="carousel-control-prev-icon"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" data-bs-target={`#carousel-${cat_name}-product${i+1}`} data-bs-slide="next" type="button">
                <span className="carousel-control-next-icon"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};
export default ProductCarousel;