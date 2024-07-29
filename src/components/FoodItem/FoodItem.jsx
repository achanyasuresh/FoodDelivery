import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import './FoodItem.css';
import { storeContext } from '../../data/storeContext';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

const FoodItem = ({ id, name, description, price, image }) => {
  const { cartItems, addToCart, removeFromCart,url } = useContext(storeContext);
  const imageUrl = `${url}/images/${image}`;
  console.log('Image URL:', imageUrl);
  return (
    <div className='food-item'>
      <div className="food-item-imagecontainer">
        <img className='food-item-image' src={url+"/images/"+image} alt="" />
        {!cartItems[id] ? (
          <AddCircleOutlineOutlinedIcon
            className='add'
            onClick={() => addToCart(id)}
            style={{ color: 'green', cursor: 'pointer' }}
          />
        ) : (
          <div className="food-item-counter">
            <RemoveCircleOutlineOutlinedIcon
              onClick={() => removeFromCart(id)}
              style={{ color: 'red', cursor: 'pointer' }}
            />
            <p>{cartItems[id]}</p>
            <AddCircleOutlineOutlinedIcon
              onClick={() => addToCart(id)}
              style={{ color: 'green', cursor: 'pointer' }}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating} alt='' />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
