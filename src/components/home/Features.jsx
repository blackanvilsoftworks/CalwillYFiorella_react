import { useContext } from 'react';
// import './Features.scss';
import FeatureBox from './FeatureBox';
import { createTitle } from '../../utils/createTitle.jsx';
import { DataContext } from '../../contexts/Data.jsx';

const Features = () => {
    const { arrFeatures } = useContext(DataContext);

    return (
        <div id="features_container" className="container mt-2 mt-sm-4 py-5">
            <div className="row justify-content-center">
                <div className="col-10">
                    <div className="row">
                        <h2 className="section-title text-center mb-4">
                            { createTitle('¿Por Qué Elegirnos?', 'bi bi-person-raised-hand') }
                        </h2>
                        {
                            arrFeatures.map(({ icon, title, description }, i) => {
                                return (
                                    <FeatureBox 
                                        key         = { i }
                                        icon        = { icon }
                                        title       = { title }
                                        description = { description }
                                    />
                                );
                            })
                        }                        
                    </div>
                </div>
            </div>
        </div>);
};
export default Features;