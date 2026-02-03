const Product = ({ id_product }) => {
    return (
        <div>

        <div>Producto individual id:{id_product}</div>
        <button className="add-to-cart">Agregar al carrito</button>
        </div>
    );
};
export default Product;