const ColorSelector = ({ availableColors, selectedColor, onSelectedColor }) => {
    return (        
        <>
            {availableColors && availableColors.length > 0 && (
                <div className="selector-group">
                    <label>
                        Color actual: <strong>{selectedColor?.colors?.description || 'Seleccioná un color'}</strong>
                    </label>
                    <div className="my-2 d-flex">
                        {availableColors.map(color => (
                            <button
                                key={color.colors.id_color}
                                className={`rounded-4 p-3 mx-1
                                    ${selectedColor?.id_variant === color.id_variant ? 'active' : ''}
                                    ${color.stock === 0 ? 'disabled' : ''}`}
                                onClick={() => onSelectedColor(color)}
                                disabled={color.stock === 0}
                                title={color.stock === 0
                                    ? `${color.colors.description} - Sin stock`
                                    : color.colors.description}
                                style={{ backgroundColor: color.colors.hex_code }}
                            ></button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
export default ColorSelector;