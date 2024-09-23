import React, { useContext, useEffect, useState } from 'react';
import './Cart.css';
import { storeContext } from '../../data/storeContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(storeContext);
  const navigate = useNavigate();
  
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  // Check if there are items in the cart
  const hasItems = Object.keys(cartItems).some(itemId => cartItems[itemId] > 0);

  useEffect(() => {
    if (!hasItems) {
      setShowEmptyMessage(true);
    } else {
      setShowEmptyMessage(false);
    }
  }, [hasItems]);

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {hasItems ? (
          food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id}>
                  <div className='cart-items-title cart-items-item'>
                    <img src={`${url}/images/${item.image}`} alt={item.name} />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className='remove'>x</p>
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })
        ) : (
          <div className="empty-cart-message animated">
            <p>Cart is empty</p>
          </div>
        )}
      </div>

      <div className="cart-bottom">
        {hasItems && (
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <p>Delivery Fees</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <b>Total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button onClick={() => navigate('/order')}>Proceed To Checkout</button>
          </div>
        )}
        <div className="cart-promo">
          <div className="cart-promo-input"></div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
