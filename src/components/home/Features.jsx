// import './Features.scss';
import FeatureBox from './FeatureBox';
import { createTitle } from '../../utils/createTitle.jsx';

const ARR_FEATURES = [
    {
        icon        : 'bi bi-star-fill',
        title       : 'Calidad Premium',
        description : 'Utilizamos materiales de primera calidad para garantizar la durabilidad y comodidad de nuestro calzado.'
    },
    {
        icon        : 'bi bi-tree-fill',
        title       : 'Materiales Sustentables',
        description : 'Nos preocupamos por el medio ambiente utilizando materiales ecológicos y procesos sostenibles.'
    },
    {
        icon        : 'bi bi-heart-fill',
        title       : 'Hecho con Amor',
        description : 'Cada par de zapatos es fabricado con dedicación y atención a los detalles.'
    }
];

const Features = () => {
    return (
        <div id="features_container" className="container mt-2 mt-sm-4 py-5">
            <div className="row justify-content-center">
                <div className="col-10">
                    <div className="row">
                        <h2 className="section-title text-center mb-4">
                            { createTitle('¿Por Qué Elegirnos?', 'bi bi-person-raised-hand') }
                        </h2>
                        {ARR_FEATURES.map(({ icon, title, description }, idx) => (
                            <FeatureBox key={idx} icon={icon} title={title} description={description} />
                        ))}
                    </div>
                </div>
            </div>
        </div>);
};
export default Features;