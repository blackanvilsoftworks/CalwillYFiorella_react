import './Features.scss';

const Features = () => {
    return (
        <div id="features_container" className="container mt-2 mt-sm-4 py-5">
            <div className="row justify-content-center">
                <div className="col-10">
                    <div className="row">
                        <h2 className="section-title text-center mb-4">
                            <span className="title">¿Por Qué Elegirnos? <i className="bi bi-person-raised-hand"></i></span>
                        </h2>
                        <div id="feature_box_container" className="col-12 col-md-4 mb-4 px-3">
                            <div className="feature-box">
                                <div className="feature-icon"><i className="bi bi-star-fill"></i></div>
                                <h3>Calidad Premium</h3>
                                <p>Utilizamos materiales de primera calidad para garantizar la durabilidad y comodidad de nuestro calzado.</p>
                            </div>
                        </div>
                        <div id="feature_box_container" className="col-12 col-md-4 mb-4 px-3">
                            <div className="feature-box">
                                <div className="feature-icon"><i className="bi bi-tree-fill"></i></div>
                                <h3>Materiales Sustentables</h3>
                                <p>Nos preocupamos por el medio ambiente utilizando materiales ecológicos y procesos sostenibles.</p>
                            </div>
                        </div>
                        <div id="feature_box_container" className="col-12 col-md-4 mb-4 px-3">
                            <div className="feature-box">
                                <div className="feature-icon"><i className="bi bi-heart-fill"></i></div>
                                <h3>Hecho con Amor</h3>
                                <p>Cada par de zapatos es fabricado con dedicación y atención a los detalles.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};
export default Features;