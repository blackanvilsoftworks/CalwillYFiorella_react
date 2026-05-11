const SizeSelector = ({ sizes, selectedSize, onSelectedSize }) => {
    return (
        <div className="selector-group">
            <label>Talles:</label>
            <div className="size-options">
                {sizes && sizes.map(size => (
                    <button
                        key={size.id_size}
                        className={`my-2 mx-1 main-btn-style ${selectedSize?.id_size === size.id_size ? 'active' : ''}`}
                        onClick={() => onSelectedSize(size)}
                    >{size.size}
                    </button>
                ))}
            </div>
        </div>
    );
};
export default SizeSelector;