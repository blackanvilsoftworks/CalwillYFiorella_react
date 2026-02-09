import { useEffect, useState } from "react";
import { getProductById } from "../../services/productService";

const Product = ({ id_product }) => {
    const [product      , setProduct    ] = useState(null);
    const [loadingProduct      , setLoadingProduct    ] = useState(true);
    const [errorProduct        , setErrorProduct      ] = useState(null);

    // Tengo que traer un array con los name de los sizes disponibles para este producto
    const [sizes      , setSizes    ] = useState([]);
    const [loadingSizes      , setLoadingSizes    ] = useState(true);
    const [errorSizes        , setErrorSizes      ] = useState(null);

    // Tengo que traer un array con los colors disponibles para el talle seleccionado
    const [colors      , setColors    ] = useState([]);
    const [loadingColors      , setLoadingColors    ] = useState(true);
    const [errorColors        , setErrorColors      ] = useState(null);

    // Cada vez que se selecciona un talle/color hay que setear este campo con el id de la variante
    // Este campo sería más que nada para el carrito de compras
    const [variant      , setVariant    ] = useState('');
    
    const getProduct = async () => {
        try {
            setLoadingProduct(true);
            setErrorProduct(null);

            // const p = await getProductById(id_product);
            // setProduct(p);
        } catch (err) {
            setErrorProduct(`Error. Por favor, intentá de nuevo. (${err.message})`);
            console.error(err);
        } finally { setLoadingProduct(false); }
    }

    useEffect(() => {
        getProduct();
    }, []);

    // useEffect(() => {
    //     if (categories.length > 0 && !category) setCategory(categories[0].id_category);
    // }, [categories]);



    if (errorProduct) return <div className="error">{errorProduct}</div>

    return (
        <div>
            <div id="product_container" className="product_container container py-3 py-sm-4 py-md-5 rounded-3">
                <div className="row justify-content-center">
                    <div className="col-6 col-lg-6 px-lg-5">
                        <p>Carousel con imágenes, predefinidas en 1er talle y primer color</p>
                        <p>Talles</p>
                        <p>Colores</p>
                        <p>Debe consultarse cuantos talles hay y poner los botones</p>
                        <p>Luego consultar cuantos colores hay para el primer taller</p>
                        <p>Cada vez que se selecciones un nuevo talle se renovará la consulta de colores</p>
                        <p>Cada vez que se seleccione un color se realizará una nueva consulta por las imágenes</p>
                    </div>
                    <div className="col-6 col-lg-6 px-lg-5">
                        <div>Producto individual id:{id_product}</div>
                        <p>Nombre del producto</p>
                        <p>Descripción larga del producto</p>
                        <p>Precio</p>
                        <p>Mostrar stock disponible para variante actual</p>
                        <p>Cantidad</p>
                        <p>Si desea comprar una cantidad superior a la que figura or stock por favor contáctenos por WhatsApp</p>
                        <button className="add-to-cart">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Product;