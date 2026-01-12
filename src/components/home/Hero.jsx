import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <div id="hero_container" className="hero mt-5 px-3">
            <h1 className="display-4 fw-bold mb-4">Calzados para Toda la Familia</h1>
            <p className="lead mb-4 fw-semibold">Somos distribuidores de una gran variedad de modelos de calzado infantil y calzado para adultos.</p>
            {/* <a className="btn btn-primary btn-lg" href="#products-container">Ver Productos</a> */}
            <Link to='/productos'>Ver Productos</Link>
        </div>
    );
};
export default Hero;