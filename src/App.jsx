import './App.css';
import NavBar from './Components/NavBar';
import ItemListContainer from './Components/itemListContainer.jsx';
import Catalogo from './Components/Catalogo.jsx';
import Contacto from './Components/Contacto.jsx';
import Proximamente from './Components/Proximamente.jsx';
import DetalleProducto from './Components/DetalleProducto.jsx';
import Cart from './Components/CartContext.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './Components/CartContext.jsx';
import CartBrief from './Components/CartBrief.jsx';
import Pago from './Components/Checkout.jsx';
import { CheckoutProvider } from './Components/CheckoutContext';
import ResultadoPago from './Components/ResultadoPago.jsx';
import Footer from './Components/Footer.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const customGreeting = "¡Hola! Bienvenido a nuestra tienda online.\n\nExplora nuestros productos.";

  return (
    <CartProvider>
      <CheckoutProvider>
        <Router>
          <div className="app-container">
          <ToastContainer />
            <NavBar />
            <div className="content">
              <Routes>
                <Route path="/" element={<ItemListContainer greeting={customGreeting} />} />
                <Route path="/catalogo" element={<Catalogo sideBar={true} />} />
                <Route path="/categorias/:categoryId" element={<Catalogo sideBar={true} />} />
                <Route path="/producto/:id" element={<DetalleProducto />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/proximamente" element={<Proximamente />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/carrito" element={<CartBrief />} />
                <Route path="/Checkout" element={<Pago />} />
                <Route path="/resultadopago" element={<ResultadoPago />} />
              </Routes>
              <Footer />
            </div>
          </div>
        </Router>

      </CheckoutProvider>
    </CartProvider>
  );
}

export default App;