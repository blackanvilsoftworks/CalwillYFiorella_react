const CAROUSEL_BTNS = [
    {
        desc: 'Anterior',
        slide: 'prev'
    },
    {
        desc: 'Siguiente',
        slide: 'next'
    }
];

const CarouselBtns = ({ id_size, id_color}) => {
    return (
        <>
            {CAROUSEL_BTNS.map(({ desc, slide }) => (
                <button key={desc} className={`carousel-control-${slide}`} data-bs-target={`#carousel-${id_size}-${id_color}`} data-bs-slide={slide} type="button">
                    <span className={`carousel-control-${slide}-icon`}></span>
                    <span className="visually-hidden">{desc}</span>
                </button>
            ))}
        </>
    );
};
export default CarouselBtns;