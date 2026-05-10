import useMainData from '../../../hooks/useMainData';

const CarouselImages = ({ images }) => {
    const { PLACEHOLDER_IMG } = useMainData();
    return (
        <>
            {images
                ? images.map((image, idx) => (
                    <div key={image.id_image} className={`carousel-item${idx === 0 ? ' active' : ''}`}>
                        <img 
                            className="d-block w-100 rounded"
                            alt={image?.produc_name}
                            src={image?.image_url}
                            onError={e => e.target.src = PLACEHOLDER_IMG}
                        />
                    </div>))
                : (<img className="d-block w-100" src={PLACEHOLDER_IMG} />)
            }
        </>
    );
};
export default CarouselImages;