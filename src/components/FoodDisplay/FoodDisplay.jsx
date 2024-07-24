import React, { useContext } from 'react';
import { storeContext } from '../../data/storeContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(storeContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes near you</h2>
      <div className="food-display-list">
        {food_list
          .filter(item => category === "All" || category === item.category)
          .map(item => (
            <FoodItem 
              key={item._id} 
              id={item._id} 
              name={item.name} 
              description={item.description} 
              price={item.price} 
              image={item.image}
            />
          ))
        }
      </div>
    </div>
  );
};

export default FoodDisplay;