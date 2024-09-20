// import React, { createContext, useEffect, useState } from "react";
// import axios from 'axios';
// export const storeContext = createContext(null);

// const StoreContextProvider = (props) => {
  
//   const [cartItems, setCartItems] = useState({});
//   const url = "http://localhost:4000";
//   const [token, setToken] = useState();
//   const [food_list, setFoodList] = useState([]);
//   const currency = "$";
//   const deliveryCharge = 5;

//   const addToCart = async (itemId) => {
//     console.log("Adding item with ID:", itemId);
//     if (!cartItems[itemId]) {
//       setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
//   }
//   else {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//   }
//   if (token) {
//       await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
//   }
//   };

//   const removeFromCart = async (itemId) => {
//     console.log("Removing item with ID:", itemId);
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
//     if (token) {
//         await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
//     }
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = food_list.find((product) => product._id === item);
//         totalAmount += itemInfo.price * cartItems[item];
//       }
//     }
//     return totalAmount;
//   };

//   const fetchFoodList = async () => {
//     const response = await axios.get(url+"/api/food/list");
//     setFoodList(response.data.data);
//   };

//   const loadCartData = async (token) => {
//     const response = await axios.get(url + "/api/cart/get", {}, { headers: token });
//     setCartItems(response.data.cartData);
//   };

//   useEffect(() => {
//     async function loadData() {
//       await fetchFoodList();
//       if (localStorage.getItem("token")) {
//           setToken(localStorage.getItem("token"))
//           await loadCartData({ token: localStorage.getItem("token") })
//       }
//   }
//   loadData()
//   }, []);



//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//     token,
//     setToken,
//     loadCartData,
//     setCartItems,
//     currency,
//     deliveryCharge
//   };

//   return (
//     <storeContext.Provider value={contextValue}>
//       {props.children}
//     </storeContext.Provider>
//   );
// };

// export default StoreContextProvider;


import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://fooddeliverybackend-29bk.onrender.com";
  const [token, setToken] = useState();
  const [food_list, setFoodList] = useState([]);
  const currency = "$";
  const deliveryCharge = 5;

  const addToCart = async (itemId) => {
    console.log("Adding item with ID:", itemId);
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    }
  };

  const removeFromCart = async (itemId) => {
    console.log("Removing item with ID:", itemId);
    if (cartItems[itemId] > 1) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    } else {
      const updatedCartItems = { ...cartItems };
      delete updatedCartItems[itemId];
      setCartItems(updatedCartItems);
    }
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) { // Ensure itemInfo is defined
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.get(url + "/api/cart/get", { headers: { token } });
    if (response.data.cartData) {
      setCartItems(response.data.cartData);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    loadCartData,
    currency,
    deliveryCharge,
  };

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
