import { useContext } from "react";
import CartContext from './CartContext.jsx';
import './CardItems.css'; // Importa los estilos CSS aquí

const CardItems = () => {
    const { cartItems } = useContext(CartContext);

    // Calcula el total a pagar
    const totalAPagar = cartItems.reduce((total, item) => {
        return total + item.precio * item.quantity;
    }, 0);

    return (
        <div className="right-sidebar-card fade-in">
            <h3 className="card-title">Carrito</h3>
            <div className="card-content">
                {cartItems.length === 0 ? (
                    <p>El carrito está vacío.</p>
                ) : (
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
                )}
                <div className="cart-total">
                    <h4>Total a pagar: ${totalAPagar.toFixed()}</h4>
                </div>
            </div>
        </div>
    );
}

export default CardItems;
