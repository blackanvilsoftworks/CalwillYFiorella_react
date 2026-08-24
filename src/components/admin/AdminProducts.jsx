import { useEffect, useMemo, useState } from 'react';
// import {
//     createAdminProduct,
//     deleteAdminProduct,
//     getAdminProducts,
//     updateAdminProduct,
//     updateAdminProductStatus,
// } from '../../services/adminService';
import './AdminProducts.scss';
import PruebaRegistros from './PruebaRegistros';

const emptyFilters = { 
    productName : '', 
    category    : '', 
    color       : '', 
    size        : '' 
};

const emptyForm = {
    id_product  : '',
    product_name: '',
    short_desc  : '',
    long_desc   : '',
    base_price  : '',
    id_category : '',
    cat_name    : '',
    sku         : '',
    price       : '',
    stock       : '',
    color_name  : '',
    size        : '',
    status      : 'A',
};

const productoFicticioA = {
    product_name: 'nombre_prueba_A',
    base_price  : 'precio_prueba_A',
    cat_name    : 'categoria_prueba_A',
    sku         : 'sku_prueba_A',
    price       : 'precio_prueba_A',
    stock       : 'stock_prueba_A',
    color_name  : 'color_prueba_A',
    size        : 'talle_prueba_A',
    status      : 'A',
};

const productoFicticioB = {
    product_name: 'nombre_prueba_B',
    base_price  : 'precio_prueba_B',
    cat_name    : 'categoria_prueba_B',
    sku         : 'sku_prueba_B',
    price       : 'precio_prueba_B',
    stock       : 'stock_prueba_B',
    color_name  : 'color_prueba_B',
    size        : 'talle_prueba_B',
    status      : 'A',
};

const productoFicticioC = {
    product_name: 'nombre_prueba_C',
    base_price  : 'precio_prueba_C',
    cat_name    : 'categoria_prueba_C',
    sku         : 'sku_prueba_C',
    price       : 'precio_prueba_C',
    stock       : 'stock_prueba_C',
    color_name  : 'color_prueba_C',
    size        : 'talle_prueba_C',
    status      : 'A',
};

const productosPrueba = [
    productoFicticioA,
    productoFicticioA,
    productoFicticioA,
    productoFicticioA,
    productoFicticioB,
    productoFicticioB,
    productoFicticioB,
    productoFicticioB,
    productoFicticioC,
    productoFicticioC,
    productoFicticioC,
    productoFicticioC
];

// const field = (record, ...names) => names.map((name) => record?.[name]).find((value) => value !== undefined && value !== null) ?? '';

// const normalizeProduct = (record) => ({
//     ...record,
//     id_product  : field(record, 'id_product', 'idProduct'),
//     product_name: field(record, 'product_name', 'productName', 'name'),
//     short_desc  : field(record, 'short_desc', 'shortDesc'),
//     long_desc   : field(record, 'long_desc', 'longDesc'),
//     base_price  : field(record, 'base_price', 'basePrice'),
//     id_category : field(record, 'id_category', 'idCategory'),
//     cat_name    : field(record, 'cat_name', 'category', 'categoryName'),
//     sku         : field(record, 'sku'),
//     price       : field(record, 'price'),
//     stock       : field(record, 'stock'),
//     color_name  : field(record, 'color_name', 'colorName'),
//     size        : field(record, 'size'),
//     status      : field(record, 'status', 'cod_status', 'codStatus') || 'A',
// });

const AdminProducts = () => {
    const [products     , setProducts]      = useState([]);
    const [filters      , setFilters]       = useState(emptyFilters);
    const [form         , setForm]          = useState(emptyForm);
    const [isModalOpen  , setIsModalOpen]   = useState(false);
    const [isCreating   , setIsCreating]    = useState(false);
    const [isLoading    , setIsLoading]     = useState(true);
    const [error        , setError]         = useState('');

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setError('');
            try {
                // setProducts((await getAdminProducts()).map(normalizeProduct));
                setProducts(productosPrueba);
            } catch (requestError) {
                setError(requestError.message || 'No se pudieron cargar los productos.');
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const options = useMemo(() => ({
        category: [...new Set(products.map((product) => product.cat_name    ).filter(Boolean))],
        color   : [...new Set(products.map((product) => product.color_name  ).filter(Boolean))],
        size    : [...new Set(products.map((product) => product.size        ).filter(Boolean))]
            .sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }))
    }), [products]);

    const filteredProducts = products.filter((product) => String(product.product_name)
        .toLowerCase().includes(filters.productName.toLowerCase()) 
        && (!filters.category   || product.cat_name     === filters.category) 
        && (!filters.color      || product.color_name   === filters.color) 
        && (!filters.size       || String(product.size) === filters.size)
    );

    const openCreateModal = () => {
        setForm(emptyForm);
        setIsCreating(true);
        setIsModalOpen(true);
    };
    
    const openEditModal = (product) => {
        setForm({ ...emptyForm, ...product });
        setIsCreating(false);
        setIsModalOpen(true);
    };
    
    const handleFormChange = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }));

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            // const saved = isCreating
            //     ? await createAdminProduct(form)
            //     : await updateAdminProduct(form.id_product, form);
            
            // const savedProduct = normalizeProduct(saved);
            
            // setProducts((current) =>
            //     isCreating
            //         ? [...current, savedProduct]
            //         : current.map((product) =>
            //             product.id_product === savedProduct.id_product
            //                 ? savedProduct
            //                 : product,
            //             )
            // );
            alert(isCreating ? 'CREANDO PRODUCTO' : 'MODIFICANDO PRODUCTO');
            
            setIsModalOpen(false);
        } catch (requestError) {
            setError(requestError.message || 'No se pudo guardar el producto.');
        }
    };

    const handleStatusChange = async (product) => {
        const nextStatus = product.status === 'A' ? 'I' : 'A';
        try {
            // await updateAdminProductStatus(product.id_product, nextStatus);
        
            // setProducts((current) => current.map((item) =>
            //     item.id_product === product.id_product
            //         ? { ...item, status: nextStatus }
            //         : item
            // ));
            alert(`CAMBIANDO ESTADO DEL PRODUCTO A: ${nextStatus}`);
        } catch (requestError) {
            setError(requestError.message || 'No se pudo cambiar el estado.');
        }
    };

    const handleDelete = async (product) => {
        if (!window.confirm(`¿Eliminar ${product.product_name}?`)) return;
        try {
            // await deleteAdminProduct(product.id_product);
            
            // setProducts((current) => current.filter((item) => item.id_product !== product.id_product));
            alert('ELIMINANDO PRODUCTO');
        } catch (requestError) {
            setError(requestError.message || 'No se pudo eliminar el producto.');
        }
    };

    return (
        <section className='admin-products mt-4'>
            <div className='d-flex flex-wrap justify-content-center align-items-center gap-2 mb-3'>
                <div>
                    <h2 className='h4 mb-1'>Gestionar Productos &nbsp;
                        <span className='text-muted fs-6'>
                            ({filteredProducts.length} registros)
                        </span>
                    </h2>
                </div>
            </div>
            <div className='card mb-3'>
                <div className='card-body row g-2'>
                    <div className='col-5'>
                        {/* PRODUCT NAME FILTER */}
                        <div class="form-floating">
                            <input 
                                id="product-filter" 
                                className="form-control" 
                                type="text" 
                                value={filters.productName}
                                onChange={({ target }) => setFilters({ ...filters, productName: target.value })}
                            />
                            <label htmlFor="product-filter">Producto</label>
                        </div>
                    </div>
                    {/* CATEGORY, COLOR, AND SIZE FILTERS */}
                    {['category', 'color', 'size'].map((filter) => (
                        <div className='col-2' key={filter}>
                            <div class="form-floating">
                                <select 
                                    id={`${filter}-filter`} 
                                    className='form-select' 
                                    value={filters[filter]}
                                    onChange={({ target }) => setFilters({ ...filters, [filter]: target.value })}
                                >
                                    <option value='' selected>Todos</option>
                                    {
                                        options[filter].map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))
                                    }
                                </select>
                                <label htmlFor={`${filter}-filter`}>
                                    {
                                        filter === 'category'
                                            ? 'Categoría'
                                            : filter === 'color'
                                                ? 'Color'
                                                : 'Talle'
                                    }
                                </label>
                            </div>
                        </div>
                    ))}
                    <div className="col-1 d-flex justify-content-center align-items-center">
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={openCreateModal}
                        >
                            Crear Producto
                        </button>
                    </div>
                </div>
            </div>
            {
                error && <div className='alert alert-danger'>{error}</div>
            }
            <div className='table-responsive'>
                <table className='table table-sm table-hover table-striped align-middle text-center'>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio base</th>
                            <th>Categoría</th>
                            <th>SKU</th>
                            <th>Precio variante</th>
                            <th>Stock</th>
                            <th>Color</th>
                            <th>Talle</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/>
                        <PruebaRegistros/> */}
                        
                        {
                            isLoading 
                                ? 
                                    (<tr>
                                        <td colSpan='10' className='text-center py-4'>
                                        Cargando productos...
                                        </td>
                                    </tr>) 
                                : filteredProducts.length === 0 
                                    ? 
                                        (<tr>
                                            <td colSpan='10' className='text-center py-4'>
                                            No hay productos para mostrar.
                                            </td>
                                        </tr>) 
                                    : 
                                        (
                                            filteredProducts.map((product) => (
                                                <tr
                                                    key={`${product.product_name}-${product.sku}`}
                                                    className={product.status !== 'A' ? 'table-danger' : ''}
                                                >
                                                    <td>{product.product_name}</td>
                                                    <td>{product.base_price}</td>
                                                    <td>{product.cat_name}</td>
                                                    <td>{product.sku}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.stock}</td>
                                                    <td>{product.color_name}</td>
                                                    <td>{product.size}</td>
                                                    <td
                                                        className={product.status !== 'A' ? 'text-danger fw-bold' : ''}
                                                    >
                                                        {product.status === 'A' ? 'Activo' : 'Inactivo'}
                                                    </td>
                                                    <td>
                                                        <div className='d-flex justify-content-center m-0 p-0 gap-1'>
                                                        <button
                                                            type='button'
                                                            className='btn btn-sm btn-outline-primary'
                                                            onClick={() => openEditModal(product)}
                                                        >
                                                            Modificar
                                                        </button>
                                                        <button
                                                            type='button'
                                                            className='btn btn-sm btn-outline-secondary'
                                                            onClick={() => handleStatusChange(product)}
                                                        >
                                                            Cambiar Estado
                                                        </button>
                                                        <button
                                                            type='button'
                                                            className='btn btn-sm btn-outline-danger'
                                                            onClick={() => handleDelete(product)}
                                                        >
                                                            Eliminar
                                                        </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                        }
                    </tbody>
                </table>
            </div>
            {
                isModalOpen && (
                    <div
                        className='admin-products-modal'
                        role='dialog'
                        aria-modal='true'
                        aria-labelledby='product-modal-title'
                    >
                        <div className='admin-products-modal__content'>
                            <div className='d-flex justify-content-between align-items-center mb-3'>
                                <h3 id='product-modal-title' className='h5 mb-0'>
                                    {isCreating ? 'Crear Producto' : 'Modificar Producto'}
                                </h3>
                                <button
                                    type='button'
                                    className='btn-close'
                                    aria-label='Cerrar'
                                    onClick={() => setIsModalOpen(false)}
                                />
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className='row g-3'>
                                    {
                                        [
                                            ['product_name' , 'Nombre'],
                                            ['short_desc'   , 'Descripción corta'],
                                            ['long_desc'    , 'Descripción larga'],
                                            ['base_price'   , 'Precio base'],
                                            ['id_category'  , 'ID categoría'],
                                            ['cat_name'     , 'Categoría'],
                                            ['sku'          , 'SKU'],
                                            ['price'        , 'Precio variante'],
                                            ['stock'        , 'Stock'],
                                            ['color_name'   , 'Color'],
                                            ['size'         , 'Talle'],
                                        ].map(([name, label]) => (
                                            <div
                                                className={name === 'long_desc' ? 'col-12' : 'col-12 col-md-6'}
                                                key={name}
                                            >
                                                <label className='form-label' htmlFor={`product-${name}`}>
                                                    {label}
                                                </label>
                                                <input
                                                    id={`product-${name}`}
                                                    name={name}
                                                    className='form-control'
                                                    value={form[name]}
                                                    onChange={handleFormChange}
                                                    required={[
                                                        'product_name',
                                                        'short_desc',
                                                        'long_desc',
                                                        'base_price',
                                                        'id_category',
                                                    ].includes(name)}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className='d-flex justify-content-end gap-2 mt-4'>
                                    <button
                                        type='button'
                                        className='btn btn-secondary'
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button type='submit' className='btn btn-primary'>
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </section>
    );
};
export default AdminProducts;