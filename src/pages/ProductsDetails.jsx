import { useParams } from "react-router-dom";
import Product from "../components/products/Product";

const ProductsDetails = () => {
    const { id_product } = useParams();
    return (<Product id_product={id_product}/>);
};
export default ProductsDetails;