import './itemListContainer.css';  
import gears from '../assets/work in progress.jpg';
import PropTypes from 'prop-types';
import Catalogo from './Catalogo';

const ItemListContainer = ({ greeting }) => {
  const defaultGreeting = "Tu web para obtener los productos que necesitas";
  const finalGreeting = greeting || defaultGreeting;

  return (
    <div className="item-list-container fade-in">
      <div className="greeting">
        {finalGreeting.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <Catalogo sideBar={false}/>
      <div className="working-notice">
        <img src={gears} alt="Working..." />
        <p>Estamos trabajando en la web para darte un mejor servicio</p>
      </div>
    </div>
  );
};

ItemListContainer.propTypes = {
  greeting: PropTypes.string
};

export default ItemListContainer;