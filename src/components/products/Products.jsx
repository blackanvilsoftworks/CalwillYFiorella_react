const Products = () => {
    return (
        <div id="products_container" className="container py-3 py-sm-4 py-md-5 rounded-3">
            <div className="row justify-content-center">
                <div className="col-10 col-lg-12 px-lg-5">
                    <div className="row">
                        <h2 className="text-center"><span className="title">Nuestros Productos <i className="bi bi-cart"></i></span></h2>
                        <ul id="productsTab" className="nav nav-pills justify-content-center mb-4" role="tablist">
                            <li className="nav-item" role="presentation"><button id="children-tab" className="nav-link btn-primary active" data-bs-toggle="pill" data-bs-target="#children" aria-selected="true" type="button" role="tab">Calzado Infantil</button></li>
                            <li className="nav-item" role="presentation"><button id="women-tab" className="nav-link btn-primary" data-bs-toggle="pill" data-bs-target="#women" aria-selected="false" type="button" tabindex="-1" role="tab">Calzado para Mujeres</button></li>
                            <li className="nav-item" role="presentation"><button id="men-tab" className="nav-link btn-primary" data-bs-toggle="pill" data-bs-target="#men" aria-selected="false" type="button" tabindex="-1" role="tab">Calzado para Hombres</button></li>
                        </ul>
                        <div id="productsTabContent" className="tab-content">
                            <div id="children" className="tab-pane fade show active" role="tabpanel" aria-labelledby="children-tab">
                                <div className="row">
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="card product-card">
                                            <div id="carousel-children-product1" className="carousel slide">
                                                <div className="carousel-inner">
                                                    <div className="carousel-item active"><img className="d-block w-100" src="./src/assets/images/productsContainer/children/product1_img1.jpg" alt="Imagen 1" /></div>
                                                    <div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/children/product1_img2.jpg" alt="Imagen 2" /></div>
                                                    <div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/children/product1_img3.jpg" alt="Imagen 3" /></div>
                                                </div>
                                                <button className="carousel-control-prev" data-bs-target="#carousel-children-product1" data-bs-slide="prev" type="button">
                                                    <span className="carousel-control-prev-icon"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button className="carousel-control-next" data-bs-target="#carousel-children-product1" data-bs-slide="next" type="button">
                                                    <span className="carousel-control-next-icon"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </div>
                                            <div className="card-body">
                                                <div className="card-title">Zapatos para Niño</div>
                                                <p className="card-text">Zapatos cómodos y resistentes para los más pequeños, disponibles en varios colores.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="card product-card">
                                            <div id="carousel-children-product2" className="carousel slide">
                                                <div className="carousel-inner">
                                                    <div className="carousel-item active"><img className="d-block w-100" src="./src/assets/images/productsContainer/children/product2_img1.jpg" alt="Imagen 1" /></div>
                                                    <div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/children/product2_img2.jpg" alt="Imagen 2" /></div>
                                                    <div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/children/product2_img3.jpg" alt="Imagen 3" /></div>
                                                </div>
                                                <button className="carousel-control-prev" data-bs-target="#carousel-children-product2" data-bs-slide="prev" type="button">
                                                    <span className="carousel-control-prev-icon"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button className="carousel-control-next" data-bs-target="#carousel-children-product2" data-bs-slide="next" type="button">
                                                    <span className="carousel-control-next-icon"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </div>
                                            <div className="card-body">
                                                <div className="card-title">Zapatos para Niña</div>
                                                <p className="card-text">Bonitos y cómodos zapatos para niñas, perfectos para ocasiones especiales y uso diario.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="card product-card">
                                            <div id="carousel-children-product3" className="carousel slide">
                                                <div className="carousel-inner">
                                                    <div className="carousel-item active"><img className="d-block w-100" src="./src/assets/images/productsContainer/children/product3_img1.jpg" alt="Imagen 1" /></div>
                                                    <div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/children/product3_img2.jpg" alt="Imagen 2" /></div>
                                                    <div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/children/product3_img3.jpg" alt="Imagen 3" /></div>
                                                </div>
                                                <button className="carousel-control-prev" data-bs-target="#carousel-children-product3" data-bs-slide="prev" type="button">
                                                    <span className="carousel-control-prev-icon"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button className="carousel-control-next" data-bs-target="#carousel-children-product3" data-bs-slide="next" type="button">
                                                    <span className="carousel-control-next-icon"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </div>
                                            <div className="card-body">
                                                <div className="card-title">Zapatos para Bebé</div>
                                                <p className="card-text">Suaves y flexibles zapatos para bebés, diseñados para no molestar sus pies en desarrollo.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4">
                                            <div className="card product-card">
                                                <div id="carousel-children-product4" className="carousel slide">
                                                    <div className="carousel-inner">
                                                        <div className="carousel-item active"><img className="d-block w-100" src="./src/assets/images/productsContainer/children/product4_img1.jpg" alt="Imagen 1" /></div>
                                                        <div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/children/product4_img2.jpg" alt="Imagen 2" /></div>
                                                        <div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/children/product4_img3.jpg" alt="Imagen 3" /></div>
                                                    </div>
                                                    <button className="carousel-control-prev" data-bs-target="#carousel-children-product4" data-bs-slide="prev" type="button">
                                                        <span className="carousel-control-prev-icon"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" data-bs-target="#carousel-children-product4" data-bs-slide="next" type="button">
                                                        <span className="carousel-control-next-icon"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>
                                                <div className="card-body">
                                                    <div className="card-title">Zapatos para Niño</div>
                                                    <p className="card-text">Bonitos y cómodos zapatos para niñas, perfectos para ocasiones especiales y uso diario.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="women" className="tab-pane fade show" role="tabpanel" aria-labelledby="women-tab"><div className="row"><div className="col-12 col-md-6 col-lg-4"><div className="card product-card"><div id="carousel-women-product1" className="carousel slide"><div className="carousel-inner"><div className="carousel-item active"><img className="d-block w-100" src="./src/assets/images/productsContainer/women/product1_img1.jpg" alt="Imagen 1" /></div><div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/women/product1_img2.jpg" alt="Imagen 2" /></div><div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/women/product1_img3.jpg" alt="Imagen 3" /></div></div><button className="carousel-control-prev" data-bs-target="#carousel-women-product1" data-bs-slide="prev" type="button"><span className="carousel-control-prev-icon"></span><span className="visually-hidden">Previous</span></button><button className="carousel-control-next" data-bs-target="#carousel-women-product1" data-bs-slide="next" type="button"><span className="carousel-control-next-icon"></span><span className="visually-hidden">Next</span></button></div><div className="card-body"><div className="card-title">Zapatos para Mujer</div><p className="card-text">Zapatos cómodos y resistentes para los más pequeños, disponibles en varios colores.</p></div></div></div><div className="col-12 col-md-6 col-lg-4"><div className="card product-card"><div id="carousel-women-product2" className="carousel slide"><div className="carousel-inner"><div className="carousel-item active"><img className="d-block w-100" src="./src/assets/images/productsContainer/women/product2_img1.jpg" alt="Imagen 1" /></div><div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/women/product2_img2.jpg" alt="Imagen 2" /></div><div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/women/product2_img3.jpg" alt="Imagen 3" /></div></div><button className="carousel-control-prev" data-bs-target="#carousel-women-product2" data-bs-slide="prev" type="button"><span className="carousel-control-prev-icon"></span><span className="visually-hidden">Previous</span></button><button className="carousel-control-next" data-bs-target="#carousel-women-product2" data-bs-slide="next" type="button"><span className="carousel-control-next-icon"></span><span className="visually-hidden">Next</span></button></div><div className="card-body"><div className="card-title">Zapatos para Mujer</div><p className="card-text">Bonitos y cómodos zapatos para niñas, perfectos para ocasiones especiales y uso diario.</p></div></div></div><div className="col-12 col-md-6 col-lg-4"><div className="card product-card"><div id="carousel-women-product3" className="carousel slide"><div className="carousel-inner"><div className="carousel-item active"><img className="d-block w-100" src="./src/assets/images/productsContainer/women/product3_img1.jpg" alt="Imagen 1" /></div><div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/women/product3_img2.jpg" alt="Imagen 2" /></div><div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/women/product3_img3.jpg" alt="Imagen 3" /></div></div><button className="carousel-control-prev" data-bs-target="#carousel-women-product3" data-bs-slide="prev" type="button"><span className="carousel-control-prev-icon"></span><span className="visually-hidden">Previous</span></button><button className="carousel-control-next" data-bs-target="#carousel-women-product3" data-bs-slide="next" type="button"><span className="carousel-control-next-icon"></span><span className="visually-hidden">Next</span></button></div><div className="card-body"><div className="card-title">Zapatos para Mujer</div><p className="card-text">Suaves y flexibles zapatos para bebés, diseñados para no molestar sus pies en desarrollo.</p></div></div></div><div className="col-12 col-md-6 col-lg-4"><div className="card product-card"><div id="carousel-women-product4" className="carousel slide"><div className="carousel-inner"><div className="carousel-item active"><img className="d-block w-100" src="./src/assets/images/productsContainer/women/product4_img1.jpg" alt="Imagen 1" /></div><div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/women/product4_img2.jpg" alt="Imagen 2" /></div><div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/women/product4_img3.jpg" alt="Imagen 3" /></div></div><button className="carousel-control-prev" data-bs-target="#carousel-women-product4" data-bs-slide="prev" type="button"><span className="carousel-control-prev-icon"></span><span className="visually-hidden">Previous</span></button><button className="carousel-control-next" data-bs-target="#carousel-women-product4" data-bs-slide="next" type="button"><span className="carousel-control-next-icon"></span><span className="visually-hidden">Next</span></button></div><div className="card-body"><div className="card-title">Zapatos para Mujer</div><p className="card-text">Bonitos y cómodos zapatos para niñas, perfectos para ocasiones especiales y uso diario.</p></div></div></div></div></div><div id="men" className="tab-pane fade show" role="tabpanel" aria-labelledby="men-tab"><div className="row"><div className="col-12 col-md-6 col-lg-4"><div className="card product-card"><div id="carousel-men-product1" className="carousel slide"><div className="carousel-inner"><div className="carousel-item active"><img className="d-block w-100" src="./src/assets/images/productsContainer/men/product1_img1.jpg" alt="Imagen 1" /></div><div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/men/product1_img2.jpg" alt="Imagen 2" /></div><div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/men/product1_img3.jpg" alt="Imagen 3" /></div></div><button className="carousel-control-prev" data-bs-target="#carousel-men-product1" data-bs-slide="prev" type="button"><span className="carousel-control-prev-icon"></span><span className="visually-hidden">Previous</span></button><button className="carousel-control-next" data-bs-target="#carousel-men-product1" data-bs-slide="next" type="button"><span className="carousel-control-next-icon"></span><span className="visually-hidden">Next</span></button></div><div className="card-body"><div className="card-title">Zapatos para Hombres</div><p className="card-text">Zapatos cómodos y resistentes para los más pequeños, disponibles en varios colores.</p></div></div></div><div className="col-12 col-md-6 col-lg-4"><div className="card product-card"><div id="carousel-men-product2" className="carousel slide"><div className="carousel-inner"><div className="carousel-item active"><img className="d-block w-100" src="./src/assets/images/productsContainer/men/product2_img1.jpg" alt="Imagen 1" /></div><div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/men/product2_img2.jpg" alt="Imagen 2" /></div><div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/men/product2_img3.jpg" alt="Imagen 3" /></div></div><button className="carousel-control-prev" data-bs-target="#carousel-men-product2" data-bs-slide="prev" type="button"><span className="carousel-control-prev-icon"></span><span className="visually-hidden">Previous</span></button><button className="carousel-control-next" data-bs-target="#carousel-men-product2" data-bs-slide="next" type="button"><span className="carousel-control-next-icon"></span><span className="visually-hidden">Next</span></button></div><div className="card-body"><div className="card-title">Zapatos para Hombres</div><p className="card-text">Bonitos y cómodos zapatos para niñas, perfectos para ocasiones especiales y uso diario.</p></div></div></div><div className="col-12 col-md-6 col-lg-4"><div className="card product-card"><div id="carousel-men-product3" className="carousel slide"><div className="carousel-inner"><div className="carousel-item active"><img className="d-block w-100" src="./src/assets/images/productsContainer/men/product3_img1.jpg" alt="Imagen 1" /></div><div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/men/product3_img2.jpg" alt="Imagen 2" /></div><div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/men/product3_img3.jpg" alt="Imagen 3" /></div></div><button className="carousel-control-prev" data-bs-target="#carousel-men-product3" data-bs-slide="prev" type="button"><span className="carousel-control-prev-icon"></span><span className="visually-hidden">Previous</span></button><button className="carousel-control-next" data-bs-target="#carousel-men-product3" data-bs-slide="next" type="button"><span className="carousel-control-next-icon"></span><span className="visually-hidden">Next</span></button></div><div className="card-body"><div className="card-title">Zapatos para Hombres</div><p className="card-text">Suaves y flexibles zapatos para bebés, diseñados para no molestar sus pies en desarrollo.</p></div></div></div><div className="col-12 col-md-6 col-lg-4"><div className="card product-card"><div id="carousel-men-product4" className="carousel slide"><div className="carousel-inner"><div className="carousel-item active"><img className="d-block w-100" src="./src/assets/images/productsContainer/men/product4_img1.jpg" alt="Imagen 1" /></div><div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/men/product4_img2.jpg" alt="Imagen 2" /></div><div className="carousel-item"><img className="d-block w-100" src="./src/assets/images/productsContainer/men/product4_img3.jpg" alt="Imagen 3" /></div></div><button className="carousel-control-prev" data-bs-target="#carousel-men-product4" data-bs-slide="prev" type="button"><span className="carousel-control-prev-icon"></span><span className="visually-hidden">Previous</span></button><button className="carousel-control-next" data-bs-target="#carousel-men-product4" data-bs-slide="next" type="button"><span className="carousel-control-next-icon"></span><span className="visually-hidden">Next</span></button></div><div className="card-body"><div className="card-title">Zapatos para Hombres</div><p className="card-text">Bonitos y cómodos zapatos para niñas, perfectos para ocasiones especiales y uso diario.</p></div></div></div></div></div></div></div></div></div></div>
    );
};
export default Products;