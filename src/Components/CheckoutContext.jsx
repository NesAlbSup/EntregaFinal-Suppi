// CheckoutContext.jsx
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
    const [checkoutProduct, setCheckoutProduct] = useState(null);

    return (
        <CheckoutContext.Provider value={{ checkoutProduct, setCheckoutProduct }}>
            {children}
        </CheckoutContext.Provider>
    );
};

CheckoutProvider.propTypes = {
  children: PropTypes.string
};

export default CheckoutContext;
