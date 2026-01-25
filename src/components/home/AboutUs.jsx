import { useContext } from 'react';
import './AboutUs.scss';
import { createTitle } from '../../utils/createTitle.jsx';
import { DataContext } from '../../contexts/Data.jsx';

const AboutUs = () => {
    const { imagesPath } = useContext(DataContext);
    
    return (
        <div id="about_us_container" className="about_us_container container mt-3 mt-sm-5 pt-5 pb-3 text-center rounded-3">
            <div className="row justify-content-center">
                <div className="col-10">
                    <div className="row">
                        <h2 className="col-12">
                            { createTitle('Sobre Nosotros', 'bi bi-balloon-heart') } 
                        </h2>
                        <div className="col-12 col-md-5 col-lg-5 align-content-center">
                            <img className="img-fluid" src={`${imagesPath}logo.jpg`} alt={`${globalInfo.name} Logo`} />
                        </div>
                        <div className="col-12 col-md-7 col-lg-7 px-5 align-self-center">
                            <p>En {globalInfo.name} nos especializamos en la fabricación de calzado infantil de la más alta calidad, con diseños únicos y materiales sostenibles.</p>
                            <p>{globalInfo.name} es una empresa dedicada a ofrecer productos de alta calidad con un enfoque en la sostenibilidad y el diseño innovador. Nuestro compromiso es brindar lo mejor a nuestros clientes, combinando tradición y modernidad.</p>
                            <p>Además, somos distribuidores de calzado para hombres y mujeres, ofreciendo una amplia variedad de estilos y tallas para toda la familia.</p>
                            <p>Nuestra misión es proporcionar calzado cómodo, durable y a la moda que satisfaga las necesidades de nuestros clientes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AboutUs;