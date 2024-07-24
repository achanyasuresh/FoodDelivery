import React, { useContext } from 'react'
import './Cart.css'
import { storeContext } from '../../data/storeContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {cartItems, food_list,removeFromCart,getTotalCartAmount} = useContext(storeContext)

  const navigate = useNavigate();
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
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0)
            {
            return(
              <div>

              <div className='cart-items-title cart-items-item'>
                <img src={item.image} />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price*cartItems[item._id]}</p>
                <p onClick={()=>removeFromCart(item._id)} className='remove'>x</p>
                </div>
                <hr />
                </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-details'>
              <p>
              Subtotal
              </p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fess</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>

      
          </div>
          <button onClick={()=>navigate('/order')}>Procced To CheckOut</button>
        </div>
        <div className="cart-promo">
          <div>
            <p>If you have promo code</p>
<div className="cart-promo-input">
  <input type='text' placeholder='promocode'></input>
  <button>Submit</button>
</div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Cart
