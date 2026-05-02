import { useContext } from 'react';
import './AboutUs.scss';
import { createTitle } from '../../utils/createTitle.jsx';
import { DataContext } from '../../contexts/Data.jsx';

const AboutUs = () => {
    const { imagesPath, globalInfo } = useContext(DataContext);
    
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
                            <p>En {globalInfo.name} acompañamos a los más chicos en una de las etapas más importantes de su crecimiento: sus primeros años. Creemos que el calzado infantil no solo debe verse lindo, sino también estar pensado para ellos, para su movimiento, su ritmo y su día a día.</p>
                            <p>Ofrecemos estilo, cuidando cada detalle del calce, los materiales y las terminaciones, para que puedan moverse con naturalidad sin dejar de verse prolijos y bien vestidos. Nuestros modelos combinan diseños clásicos que nunca pasan de moda con toques actuales.</p>
                            <p>Somos una familia con más de 15 años de experiencia en el rubro, y ese camino nos enseñó que detrás de cada par hay una historia, una salida, un festejo o un día especial. Por eso trabajamos con dedicación y compromiso, ofreciendo calzado que acompañe el crecimiento de los pies y brinde tranquilidad a quienes eligen cuidarlos.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AboutUs;