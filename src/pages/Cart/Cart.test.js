import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cart from './Cart';
import { storeContext } from '../../data/storeContext';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock functions and context values
const mockRemoveFromCart = jest.fn();
const mockGetTotalCartAmount = jest.fn(() => 10); // Example subtotal amount
const mockContextValue = {
  cartItems: { 'item1': 2 },
  food_list: [{ _id: 'item1', name: 'Food Item', price: 5, image: 'food-item.jpg' }],
  removeFromCart: mockRemoveFromCart,
  getTotalCartAmount: mockGetTotalCartAmount,
  url: 'http://localhost:5000'
};

const renderCart = () => {
  render(
    <storeContext.Provider value={mockContextValue}>
      <Router>
        <Cart />
      </Router>
    </storeContext.Provider>
  );
};

describe('Cart Component', () => {
  test('renders cart items correctly', () => {
    renderCart();

    expect(screen.getByText(/Food Item/i)).toBeInTheDocument();
  });

  test('calls removeFromCart when remove button is clicked', () => {
    renderCart();

    // Simulate clicking the remove button
    fireEvent.click(screen.getByText(/x/i));

    // Check if the removeFromCart function was called with the correct item ID
    expect(mockRemoveFromCart).toHaveBeenCalledWith('item1');
  });

});
