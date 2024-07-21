import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-popup fade-in">
      <p>{message}</p>
      <div className="confirmation-buttons">
      <Link to='/'><button onClick={onConfirm}>Sí</button></Link>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

ConfirmationPopup.propTypes = {
    message: PropTypes.string.isRequired, // Asegura que message sea de tipo string y obligatorio
    onConfirm: PropTypes.func.isRequired, // Asegura que onConfirm sea de tipo función y obligatorio
    onCancel: PropTypes.func.isRequired, // Asegura que onCancel sea de tipo función y obligatorio
  };

export default ConfirmationPopup;