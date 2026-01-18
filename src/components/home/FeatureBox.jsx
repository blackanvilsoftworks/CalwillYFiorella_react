import './FeatureBox.scss';

const FeatureBox = ({ icon, title, description }) => {
    return (
        <div className="col-12 col-md-4 mb-4 px-3">
            <div className="feature-box">
                <div className="feature-icon"><i className={icon}></i></div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};
export default FeatureBox;