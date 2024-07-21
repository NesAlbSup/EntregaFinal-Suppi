// Checkout.jsx
import { useState, useContext } from 'react';
import './Checkout.css';
import CartContext from '../Components/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import CheckoutContext from '../Components/CheckoutContext.jsx';
import { toast } from 'react-toastify';
import Contacto from './Contacto.jsx';

const Checkout = () => {
    const [transferencia, setTransferencia] = useState(false);
    const [credito, setCredito] = useState(false);
    const [debito, setDebito] = useState(false);
    const [envioadom, setenvioadom] = useState(false);
    const [retiro, setretiro] = useState(false);

    const { cartItems } = useContext(CartContext);
    const { checkoutProduct } = useContext(CheckoutContext);
    const navigate = useNavigate();

    const selectTypeInput = (valor) => {
        switch (valor) {
            case "transferencia":
                setTransferencia(true);
                setDebito(false);
                setCredito(false);
                break;
            case "debito":
                setDebito(true);
                setTransferencia(false);
                setCredito(false);
                break;
            case "credito":
                setCredito(true);
                setDebito(false);
                setTransferencia(false);
                break;
            default:
                setTransferencia(false);
                setDebito(false);
                setCredito(false);
                break;
        }
    };

    const selectTypeInputdel = (valor) => {
        switch (valor) {
            case "retiro":
                setretiro(true);
                setenvioadom(false);
                break;
            case "envioadom":
                setenvioadom(true);
                setretiro(false);
                break;
            default:
                setretiro(false);
                setenvioadom(false);
                break;
        }
    };

    const totalAPagar = (checkoutProduct ? [checkoutProduct] : cartItems).reduce((total, item) => {
        return total + item.precio * item.quantity;
    }, 0);

    const handleVolver = () => {
        navigate(-1);
    };

    const handlePay = () => {
        let paymentMethodSelected = transferencia || debito || credito;
        let deliveryMethodSelected = envioadom || retiro;

        if (!paymentMethodSelected) {
            toast.error('Por favor, seleccione una forma de pago.');
            return;
        }

        if (!deliveryMethodSelected) {
            toast.error('Por favor, seleccione una forma de entrega.');
            return;
        }

        if (envioadom) {
            let requiredFields = ["calle", "numero", "localidad", "provincia"];
            for (let field of requiredFields) {
                let value = document.getElementById(field).value;
                if (!value) {
                    toast.error(`Por favor, complete el campo ${field}.`);
                    return;
                }
            }
        }

        if ((debito || credito) && (!document.getElementById('cardNumber').value || !document.getElementById('cardName').value || !document.getElementById('expiryDate').value || !document.getElementById('cvv').value)) {
            toast.error('Por favor, complete todos los campos de la tarjeta.');
            return;
        }

        navigate('/resultadopago');
        
    };

    const handleNumberInput = (e) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) {
            toast.error('Por favor, ingrese solo números en el campo Nro.');
            e.target.value = value.replace(/\D/g, '');
        }
    };

    return (
        <div>
            <div className="cart-methods-container fade-in">
                {checkoutProduct ? (
                    <>
                    <ul className="cart-checkout-items">
                        <li className="cart-item">
                            <img src={checkoutProduct.imagen} alt={checkoutProduct.nombre} className="cart-item-image" />
                            <div className="cart-item-details">
                                <p>{checkoutProduct.nombre} - Cantidad: {checkoutProduct.quantity}</p>
                                <p>Precio: ${checkoutProduct.precio.toFixed(0)}</p>
                            </div>
                        </li>
                    </ul>
                    <div className="cart-total">
                        <h3>Total a pagar: ${totalAPagar.toFixed(0)}</h3>
                    </div>
                    </>
                ) : cartItems.length === 0 ? (
                    <p>No hay productos en el carrito</p>
                ) : (
                    <>
                        <ul className="cart-checkout-items">
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
                    </>
                )}
            </div>
            <div className="checkout-container fade-in">
                Seleccione forma de pago
            </div>
            <div className="payment-methods-container fade-in">
                <div className="delivery-methods">
                    <div>
                        <input type="radio" id="retiro" name="delivery" value="retiro" onChange={() => selectTypeInputdel("retiro")} />
                        <label htmlFor="retiro">Retiro en el local</label>
                    </div>
                    <div>
                        <input type="radio" id="envioadom" name="delivery" value="envioadom" onChange={() => selectTypeInputdel("envioadom")} />
                        <label htmlFor="envioadom">Envío a domicilio</label>
                    </div>
                </div>
                <div className="typedelivery">
                    {retiro && <label htmlFor="retiro">Horarios de atencion: Todos los días de 8 a.m. a 19 p.m. Domingos cerrados.</label>}
                    {envioadom && (
                        <div className="delivery-form">
                            <div className="form-row">
                                <div className="form-group-dom">
                                    <label htmlFor="calle">Calle</label>
                                    <input type="text" id="calle" name="calle" placeholder="Calle nombre" />
                                </div>
                            </div>
                            <div className="form-row">
                            <div className="form-group-dom">
                                    <label htmlFor="numero">Nro</label>
                                    <input type="text" id="numero" name="numero" placeholder="1400" inputMode="numeric" pattern="[0-9]*" onInput={handleNumberInput} />
                                </div>
                                <div className="form-group-dom">
                                    <label htmlFor="piso">Piso</label>
                                    <input type="text" id="piso" name="piso" placeholder="2" />
                                </div>
                                <div className="form-group-dom">
                                    <label htmlFor="depto">Depto</label>
                                    <input type="text" id="depto" name="depto" placeholder="D" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group-dom">
                                    <label htmlFor="localidad">Localidad</label>
                                    <input type="text" id="localidad" name="localidad" placeholder="Ciudad" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group-dom">
                                    <label htmlFor="provincia">Provincia</label>
                                    <input type="text" id="provincia" name="provincia" placeholder="Provincia" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="payment-methods">
                    <div>
                        <input type="radio" id="efectivo" name="paymentMethod" value="transferencia" onChange={() => selectTypeInput("transferencia")} />
                        <label htmlFor="efectivo">Transferencia</label>
                    </div>
                    <div>
                        <input type="radio" id="debito" name="paymentMethod" value="debito" onChange={() => selectTypeInput("debito")} />
                        <label htmlFor="debito">Débito</label>
                    </div>
                    <div>
                        <input type="radio" id="credito" name="paymentMethod" value="credito" onChange={() => selectTypeInput("credito")} />
                        <label htmlFor="credito">Crédito</label>
                    </div>
                </div>
                <div className="typePago">
                    {transferencia && (
                        <div>
                        <label htmlFor="transferencia">Transfiera el total a la siguiente cuenta: 000422-13425</label>
                        <Contacto/>
                        </div>
                    )}
                    {debito && (
                        <div className="card-form">
                            <div className="form-group">
                                <label htmlFor="cardNumber">Número de tarjeta</label>
                                <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cardName">Nombre en la tarjeta</label>
                                <input type="text" id="cardName" name="cardName" placeholder="John Doe" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="expiryDate">Fecha de vencimiento</label>
                                <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input type="text" id="cvv" name="cvv" placeholder="123" />
                            </div>
                        </div>
                    )}
                    {credito && (
                        <div className="card-form">
                            <div className="form-group">
                                <label htmlFor="cardNumber">Número de tarjeta</label>
                                <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cardName">Nombre en la tarjeta</label>
                                <input type="text" id="cardName" name="cardName" placeholder="John Doe" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="expiryDate">Fecha de vencimiento</label>
                                <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input type="text" id="cvv" name="cvv" placeholder="123" />
                            </div>
                        </div>
                    )}
                </div>
                <button onClick={handlePay}>Pagar</button>
                <button onClick={handleVolver}>Volver</button>
            </div>
        </div>
    );
};

export default Checkout;
