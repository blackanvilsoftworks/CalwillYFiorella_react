import useMainData from '../../../hooks/useMainData.js';
import SocialBtn from './SocialBtn.jsx';
import CompanyInfo from './CompanyInfo.jsx';
import './Footer.scss';

const Footer = () => {
    const { globalInfo } = useMainData();

    return (
        <footer id="footer_container" className="text-center pt-4 mt-3">
            <div className="container pt-0">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        {globalInfo && (
                            <>
                                {/* Botones de redes sociales */}
                                <SocialBtn globalInfo={globalInfo} />
                                
                                <hr />
                                
                                {/* Información de la empresa */}
                                <CompanyInfo name={globalInfo.name}/>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </footer>);
};
export default Footer;