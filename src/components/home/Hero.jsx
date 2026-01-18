import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Hero.scss';
import { DataContext } from '../../contexts/Data.jsx';

const Hero = () => {
    const { objContainers } = useContext(DataContext);
        
    const data = objContainers.hero;

    return (
        <div id={data.id} className={data.className}>
            <h1 className="display-4 fw-bold mb-4">Calzados para Toda la Familia</h1>
            <p className="lead mb-4 fw-semibold">Somos distribuidores de una gran variedad de modelos de calzado infantil y calzado para adultos.</p>
            <Link className="btn main-btn-style btn-lg" to='/productos'>Ver Productos</Link>
        </div>
    );
};
export default Hero;