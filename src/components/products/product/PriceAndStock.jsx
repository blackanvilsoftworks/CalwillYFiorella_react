import { formatCurrency } from '../../../utils/helpers';

const PriceAndStock = ({ selectedColor }) => {
    const stock = selectedColor && selectedColor.stock;
    return (
        <>
            {selectedColor && (
                <div className="price-section">
                    <p className="price">Precio del artículo seleccionado: {formatCurrency(selectedColor.price)}</p>
                    <p className={`stock ${stock === 0 ? 'out' : ''}`}>
                        {stock > 0 ? `Stock disponible: ${stock}.` : 'Sin stock.'}
                    </p>
                </div>
            )}
        </>
    );
};
export default PriceAndStock;