import { useState, useContext } from 'react';
import { useParams,Link ,useNavigate } from 'react-router-dom';
import productosData from './productosData';
import './DetalleProducto.css'
import CartContext from '../Components/CartContext.jsx';
import CheckoutContext from '../Components/CheckoutContext.jsx';

const DetalleProducto = () => {
  const { id } = useParams();
  const producto = productosData.find(prod => prod.id === parseInt(id));

  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad de productos
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { setCheckoutProduct } = useContext(CheckoutContext);

  const aumentarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const agregarAlCarrito = () => {
    addToCart(producto, cantidad);
    console.log(`Agregado al carrito: ${cantidad} unidades de ${producto.nombre}`);
  };

  const comprarAhora = () => {
    setCheckoutProduct({ ...producto, quantity: cantidad });
    navigate('/checkout');
    console.log(`Comprar ${cantidad} unidades de ${producto.nombre}`);
  };

  if (!producto) {
    return <div>Cargando producto...</div>;
  }

  return (
    <div>
      <div className='greetings'>
        <h3>{producto.nombre}</h3>
      </div>
      <div className="detalle-producto-container fade-in">
        <div className="producto-card">
          <img src={producto.imagen} alt={producto.nombre} className="producto-image" />
        </div>
        <div className="producto-info">
          <h1>{producto.nombre}</h1>
          <p>{producto.descripcion}</p>
          <p>Precio: ${producto.precio.toFixed(0)}</p>
          {/* Botones para la cantidad de artículos */}
          <div className="cantidad-buttons">
            <button onClick={disminuirCantidad}>-</button>
            <span>{cantidad}</span>
            <button onClick={aumentarCantidad}>+</button>
          </div>
          
          <Link to='/checkout'><button className="agregar-carrito-button" onClick={comprarAhora}>Comprar Ahora</button></Link>
          <button className="agregar-carrito-button" onClick={agregarAlCarrito}>Agregar al Carrito</button>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
