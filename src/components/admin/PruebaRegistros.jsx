const PruebaRegistros = () => {
    return (
        <tr>
            <td>product_name</td>
            {/* ESTOS DOS TIENEN QUE IR EN EL MODAL DE MODIFICACIÓN, NO EN EL LISTADO
            <td>short_desc</td>
            <td>long_desc</td> */}
            <td>base_price</td>
            <td>cat_name</td>
            <td>sku</td>
            <td>price</td>
            <td>stock</td>
            <td>color_name</td>
            {/* EN EL MODAL TAMBIÉN HAY QUE PONER UN CAMPO PARA MODIFICAR EL CÓDIGO DE COLOR EN EXADECIMAL */}
            <td>size</td>
            <td>status</td>
            <td>
                <div className='d-flex justify-content-center m-0 p-0 gap-1'>
                    <button
                        type='button'
                        className='btn btn-sm btn-outline-primary'
                        // onClick={() => openEditModal(product)}
                    >
                        Modificar
                    </button>
                    <button
                        type='button'
                        className='btn btn-sm btn-outline-secondary'
                        // onClick={() => handleStatusChange(product)}
                    >
                        Cambiar Estado
                    </button>
                    <button
                        type='button'
                        className='btn btn-sm btn-outline-danger'
                        // onClick={() => handleDelete(product)}
                    >
                        Eliminar
                    </button>
                </div>
            </td>
        </tr>
    );
};
export default PruebaRegistros;