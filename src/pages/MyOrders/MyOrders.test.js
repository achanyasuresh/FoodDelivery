import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MyOrders from './MyOrders';
import { storeContext } from '../../data/storeContext';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Mock context values
const mockContextValue = {
  url: 'http://localhost:5000',
  token: 'mockToken',
  currency: '$'
};

// Sample order data
const mockOrderData = [
  {
    items: [
      { name: 'Burger', quantity: 2 },
      { name: 'Fries', quantity: 1 }
    ],
    amount: 15,
    status: 'Delivered'
  },
  {
    items: [
      { name: 'Pizza', quantity: 1 }
    ],
    amount: 20,
    status: 'Pending'
  }
];

test('renders MyOrders with order data', async () => {
  // Mock the API response
  axios.post.mockResolvedValue({ data: { data: mockOrderData } });

  render(
    <storeContext.Provider value={mockContextValue}>
      <MyOrders />
    </storeContext.Provider>
  );

  // Wait for the orders to be fetched and rendered
  await waitFor(() => {
    // Check if the component renders the order items
    expect(screen.getByText('Burger x 2, Fries x 1')).toBeInTheDocument();
    expect(screen.getByText('$15.00')).toBeInTheDocument();
    expect(screen.getByText('Items: 2')).toBeInTheDocument();
    expect(screen.getByText('Delivered')).toBeInTheDocument();

    expect(screen.getByText('Pizza x 1')).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument();
    expect(screen.getByText('Items: 1')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });
});
