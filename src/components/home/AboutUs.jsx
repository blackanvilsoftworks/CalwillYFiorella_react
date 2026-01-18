import { useContext } from 'react';
import './AboutUs.scss';
import { createTitle } from '../../utils/createTitle.jsx';
import { DataContext } from '../../contexts/Data.jsx';

const AboutUs = () => {
    const { objContainers, imagesPath } = useContext(DataContext);
    
    const data = objContainers.about;
    
    return (
        <div id={data.id} className={data.className}>
            <div className="row justify-content-center">
                <div className="col-10">
                    <div className="row">
                        <h2 className="col-12">
                            { createTitle(data.title, data.icon) }
                        </h2>
                        <div className="col-12 col-md-5 col-lg-5 align-content-center">
                            <img className="img-fluid" src={`${imagesPath}logo.jpg`} alt="Calwill & Fiorella Logo" />
                        </div>
                        <div className="col-12 col-md-7 col-lg-7 px-5 align-self-center">
                            <p>En Calwill & Fiorella nos especializamos en la fabricación de calzado infantil de la más alta calidad, con diseños únicos y materiales sostenibles.</p>
                            <p>Calwill y Fiorella es una empresa dedicada a ofrecer productos de alta calidad con un enfoque en la sostenibilidad y el diseño innovador. Nuestro compromiso es brindar lo mejor a nuestros clientes, combinando tradición y modernidad.</p>
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