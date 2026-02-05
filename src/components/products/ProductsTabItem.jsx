const ProductsTabItem = ({items}) => {
    return items.map(({ id, title }, i) => {
        const isActive = i === 0 ? true : false;
        return (
            // id !== 'Próximamente'
            //     ? 
                (
                    <li key={id} className="nav-item" role="presentation">
                        <button
                            id={`${id}-tab`}
                            className={`nav-link main-btn-style mx-1${isActive ? ' active': ''}`}
                            data-bs-toggle="pill"
                            data-bs-target={`#${id}`}
                            aria-selected={isActive} 
                            type="button"
                            role="tab"
                            style={{ width: 250 }}
                        >{title}</button>
                    </li>
                ) 
                // : (
                //     <li key={id} className="nav-item">
                //         <button
                //             id={id}
                //             className="nav-link main-btn-style mx-1"
                //             type="button"
                //             style={{ width: 250 }}
                //         >{title}</button>
                //     </li>
                // )            
        )
    });
};
export default ProductsTabItem;