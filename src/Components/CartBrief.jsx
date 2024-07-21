import { useContext, useState } from 'react';
import CartContext from '../Components/CartContext.jsx';
import './CartBrief.css';
import ConfirmationPopup from './PopUp.jsx';
import { Link } from 'react-router-dom';

const CartBrief = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const totalAPagar = cartItems.reduce((total, item) => {
    return total + item.precio * item.quantity;
  }, 0);

  const handleClearCart = () => {
    setShowConfirmation(true); // Mostrar el pop-up de confirmación
  };

  const confirmClearCart = () => {
    clearCart(); // Limpia el carrito usando la función del contexto
    setShowConfirmation(false); // Ocultar el pop-up de confirmación después de confirmar
  };

  const cancelClearCart = () => {
    setShowConfirmation(false); // Ocultar el pop-up de confirmación si se cancela
  };

  return (
    <div className="cart-brief fade-in">
      <h2>Resumen del Carrito</h2>
      {cartItems.length === 0 ? (
        <div>
          <div className='banner'>
            <p>El carrito está vacío.</p>
          </div>
          <div className='button'>
            <p><Link to='/catalogo'><button>Navega Nuestros productos</button></Link></p>
          </div>
        </div>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.imagen} alt={item.nombre} className="cart-item-image" />
                <div className="cart-item-details">
                  <p>{item.nombre} - Cantidad: {item.quantity}</p>
                  <p>Precio: ${item.precio.toFixed(0)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total a pagar: ${totalAPagar.toFixed(0)}</h3>
          </div>
          <div className="cart-buttons">
            <Link to='/Checkout'><button className="agregar-carrito-button">Proceder a pagar</button></Link>
            <button className="agregar-carrito-button " onClick={handleClearCart}>Limpiar carrito</button>
          </div>
        </>
      )}
      {showConfirmation && (
        <ConfirmationPopup
          message="¿Está seguro de limpiar el carrito?"
          onConfirm={confirmClearCart}
          onCancel={cancelClearCart}
        />
      )}
    </div>
  );
};

export default CartBrief;
