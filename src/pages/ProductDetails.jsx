import { useParams } from "react-router-dom";
import Product from "../components/products/product/Product";

const ProductDetails = () => {
    const { id_product } = useParams();
    return (<Product id_product={id_product}/>);
};
export default ProductDetails;