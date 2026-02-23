import './Loader.scss';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader-content">
                <img 
                    src="/navbar-logo.png"
                    alt="Cargando..." 
                    className="loader-image rounded-5"
                />
                <div className="spinner-wrapper">
                    <div className="custom-spinner"></div>
                    <span className="loading-text">Cargando...</span>
                </div>
            </div>
        </div>
    );
};

export default Loader