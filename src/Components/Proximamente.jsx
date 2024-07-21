import { Link } from 'react-router-dom';
import './Proximamente.css'; 

const Proximamente = () => {
  return (
    <div className="prox-container fade-in">
      <div className="prox-content">
        <h1>Proximamente</h1>
        <p>Estamos trabajando en mejorar nuestra tienda online.</p>
        <Link to='/Contacto' className="link-button">Contáctanos</Link>
        <Link to='/' className="link-button">Volver al Inicio</Link>
      </div>
    </div>
  );
};

export default Proximamente;