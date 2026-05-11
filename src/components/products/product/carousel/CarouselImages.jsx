const CarouselImages = ({ images }) => {
    return images.map(({ id_image, produc_name, image_url }, idx) => (
        <div key={id_image} className={`carousel-item${idx === 0 ? ' active' : ''}`}>
            <img 
                className="d-block w-100 rounded"
                alt={produc_name}
                src={image_url}
            />
        </div>
    ));
};
export default CarouselImages;