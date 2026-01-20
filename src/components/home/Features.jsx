import { useContext } from 'react';
// import './Features.scss';
import FeatureBox from './FeatureBox';
import { createTitle } from '../../utils/createTitle.jsx';
import { DataContext } from '../../contexts/Data.jsx';

const Features = () => {
    const { objContainers, arrFeatures } = useContext(DataContext);

    const data = objContainers.features;

    return (
        <div id={data.id} className={data.className}>
            <div className="row justify-content-center">
                <div className="col-10">
                    <div className="row">
                        <h2 className="section-title text-center mb-4">
                            { createTitle(data.title, data.icon) }
                        </h2>
                        {
                            arrFeatures.map( ({ icon, title, description }) => {
                                return (
                                    <FeatureBox 
                                        key         = { title }
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