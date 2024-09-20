import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FoodItem from './FoodItem';
import { storeContext } from '../../data/storeContext';

const mockAddToCart = jest.fn();
const mockRemoveFromCart = jest.fn();

const mockContextValue = {
  cartItems: {},
  addToCart: mockAddToCart,
  removeFromCart: mockRemoveFromCart,
  url: 'http://localhost:4000'
};

describe('FoodItem Component', () => {
  test('renders FoodItem component with correct props', () => {
    render(
      <storeContext.Provider value={mockContextValue}>
        <FoodItem 
          id="1"
          name="Pizza"
          description="Delicious cheese pizza"
          price="10.99"
          image="pizza.jpg"
        />
      </storeContext.Provider>
    );

    // Using data-testid attributes
    expect(screen.getByTestId('food-item-name')).toHaveTextContent('Pizza');
    expect(screen.getByTestId('food-item-desc')).toHaveTextContent('Delicious cheese pizza');
    expect(screen.getByTestId('food-item-price')).toHaveTextContent('$10.99');
    expect(screen.getByTestId('food-item-rating')).toBeInTheDocument();
    expect(screen.getByTestId('food-item-image')).toBeInTheDocument();
  });

  test('calls addToCart when add icon is clicked', () => {
    render(
      <storeContext.Provider value={mockContextValue}>
        <FoodItem 
          id="1"
          name="Pizza"
          description="Delicious cheese pizza"
          price="10.99"
          image="pizza.jpg"
        />
      </storeContext.Provider>
    );

    fireEvent.click(screen.getByTestId('add-icon'));
    expect(mockAddToCart).toHaveBeenCalledWith('1');
  });

  test('calls removeFromCart when remove icon is clicked and shows correct counter', () => {
    render(
      <storeContext.Provider value={{ ...mockContextValue, cartItems: { '1': 2 } }}>
        <FoodItem 
          id="1"
          name="Pizza"
          description="Delicious cheese pizza"
          price="10.99"
          image="pizza.jpg"
        />
      </storeContext.Provider>
    );

    fireEvent.click(screen.getByTestId('remove-icon'));
    expect(mockRemoveFromCart).toHaveBeenCalledWith('1');
  });

  test('renders correct icons and counter when item is in the cart', () => {
    render(
      <storeContext.Provider value={{ ...mockContextValue, cartItems: { '1': 2 } }}>
        <FoodItem 
          id="1"
          name="Pizza"
          description="Delicious cheese pizza"
          price="10.99"
          image="pizza.jpg"
        />
      </storeContext.Provider>
    );

    expect(screen.getByTestId('remove-icon')).toBeInTheDocument();
    expect(screen.getByTestId('add-icon')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Ensure counter is displayed
  });

  test('renders add icon when item is not in the cart', () => {
    render(
      <storeContext.Provider value={{ ...mockContextValue, cartItems: {} }}>
        <FoodItem 
          id="2"
          name="Burger"
          description="Juicy beef burger"
          price="8.99"
          image="burger.jpg"
        />
      </storeContext.Provider>
    );

    expect(screen.queryByTestId('remove-icon')).not.toBeInTheDocument();
    expect(screen.getByTestId('add-icon')).toBeInTheDocument();
  });
});
