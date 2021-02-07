import React, { createContext, useState } from "react";

const ShoppingCartContext = createContext({});

export const ShoppingCartContextProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [withVoucher, setWithVoucher] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = ({ id, name, colour, size, price }) => {
    //calculate amount of shoes of same size
    const itemUid = `${id}-${size}`;
    let quantity = 1;
    if (cartItems[itemUid]) quantity = cartItems[itemUid].quantity + 1;

    setCartItems({
      ...cartItems,
      [itemUid]: {
        id,
        name,
        colour,
        size,
        price,
        quantity,
      },
    });
  };

  const removeFromCart = (id, size) => {
    const itemUid = `${id}-${size}`;

    //filter out item to remove
    const newCart = Object.fromEntries(
      Object.entries(cartItems).filter(([k, v]) => k !== itemUid)
    );

    setCartItems(newCart);
  };

  const clearCart = () => {
    setCartItems({});
    setWithVoucher(false);
  };

  const context = {
    showCart,
    setShowCart,
    cartItems,
    addToCart,
    removeFromCart,
    withVoucher,
    setWithVoucher,
    clearCart,
  };

  return (
    <ShoppingCartContext.Provider value={context}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartContext;
