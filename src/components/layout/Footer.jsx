import { useContext } from 'react';
import { DataContext } from '../../contexts/Data.jsx';

import './Footer.scss';

const Footer = () => {

    const msgBtnFailed = 'Se detectó un problema con este botón y actualmente no está funcionando. Estamos trabajando para resolverlo. Le pedimos disculpas por las molestias ocasionadas.';

    const { globalInfo, arrSocialMedia } = useContext(DataContext);

    const facebookBtnHandler = ()=> {
        const facebookItem = arrSocialMedia.find(item => item.name === 'facebook');
        
        facebookItem ?
            window.open(facebookItem.url, '_blank') :
            alert(msgBtnFailed);
    };
    
    const whatsappBtnHandler = ()=> {
        const whatsappItem = arrSocialMedia.find(item => item.name === 'whatsapp');
        
        if (!whatsappItem) {
            alert(msgBtnFailed);
            return;
        }
        
        const whatsappName      = "NOMBRE_AQUI";
        const whatsappMessage   = "MENSAJE_AQUI";
        const whatsappURL       = `${whatsappItem.url}?text=Hola,%20mi%20nombre%20es%20${encodeURIComponent(whatsappName)}.%20Quería%20consultar%20por%20${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappURL, '_blank');
    };

    const clickBtnHandler = (e) => {
        switch (e.currentTarget.id) {
            case 'facebook':
                facebookBtnHandler();
                break;
            case 'whatsapp':
                whatsappBtnHandler();
                break;
            default:
                alert(msgBtnFailed);
        }
    };

    return (
        <footer id="footer_container" className="text-center pt-4 mt-3">
            <div className="container pt-0">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <div className="row">
                            {
                                arrSocialMedia.map(({ name, color, icon }, i) => {
                                    return (
                                        <div key={name} className="col-12 col-sm-6 mb-3">
                                            <button id={name} className={`btn btn-outline-${color} w-100`} type="button" onClick={clickBtnHandler}><i className={icon}></i> {name.charAt(0).toUpperCase() + name.slice(1)}</button>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-12">
                                <h5>{globalInfo.name}</h5>
                                <p>Distribuidores de calzado infantil y calzado para adultos. Comodidad y estilo para toda la familia.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>);
};
export default Footer;