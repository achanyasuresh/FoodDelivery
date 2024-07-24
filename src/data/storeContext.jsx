import React, { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    console.log("Adding item with ID:", itemId);
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    console.log("Removing item with ID:", itemId);
    setCartItems((prev) => {
      const newCount = prev[itemId] - 1;
      if (newCount <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newCount };
    });
  };

const getTotalCartAmount = () => {
  let totalAmount =0;
  for(const item in cartItems)
  {
    if(cartItems[item]>0){
      let itemInfo = food_list.find((product)=>product._id === item);
      totalAmount += itemInfo.price*cartItems[item];
    }
   
  }
  return totalAmount;
}

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  };

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
