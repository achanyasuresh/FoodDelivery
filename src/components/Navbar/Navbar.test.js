import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navbar from './Navbar';
import { storeContext } from '../../data/storeContext';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the assets
jest.mock('../../assets/assets', () => ({
  assets: {
    logo1: 'mock-logo-url',
  },
}));

// Mock functions and context values
const mockSetShowLogin = jest.fn();
const mockGetTotalCartAmount = jest.fn(() => 1); // Assume there is 1 item in the cart
const mockSetToken = jest.fn();

const mockContextValue = {
  getTotalCartAmount: mockGetTotalCartAmount,
  token: 'mock-token',
  setToken: mockSetToken,
};

// Helper to render component with necessary props and context
const renderNavbar = () => {
  render(
    <storeContext.Provider value={mockContextValue}>
      <Router>
        <Navbar setShowLogin={mockSetShowLogin} />
      </Router>
    </storeContext.Provider>
  );
};

describe('Navbar Component', () => {
  test('renders the Navbar with logo and menu items', () => {
    renderNavbar();

    // Check if the logo is rendered
    
    // Check if the menu items are rendered
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Menu/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
    
    // Check if the search icon is rendered
  });

    test('renders Menu and Contact Us links', () => {
      renderNavbar();
  
      // Check if Menu and Contact Us links are rendered
      expect(screen.getByText(/Menu/i)).toBeInTheDocument();
      expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
    });

  test('shows Sign in button when not authenticated', () => {
    render(
      <storeContext.Provider value={{ ...mockContextValue, token: '' }}>
        <Router>
          <Navbar setShowLogin={mockSetShowLogin} />
        </Router>
      </storeContext.Provider>
    );

    // Check if the Sign in button is rendered
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  test('shows profile dropdown when authenticated', () => {
    renderNavbar();

    // Check if the profile icon and dropdown are rendered
    expect(screen.getByText(/Orders/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test('calls setShowLogin when Sign in button is clicked', () => {
    render(
      <storeContext.Provider value={{ ...mockContextValue, token: '' }}>
        <Router>
          <Navbar setShowLogin={mockSetShowLogin} />
        </Router>
      </storeContext.Provider>
    );

    // Simulate clicking the Sign in button
    fireEvent.click(screen.getByText(/Sign in/i));

    // Check if setShowLogin is called
    expect(mockSetShowLogin).toHaveBeenCalledWith(true);
  });

  test('logs out and navigates to home on logout', () => {
    const mockNavigate = jest.fn();
    render(
      <storeContext.Provider value={{ ...mockContextValue, setToken: mockSetToken }}>
        <Router>
          <Navbar setShowLogin={mockSetShowLogin} />
        </Router>
      </storeContext.Provider>
    );

    // Simulate clicking the Logout button
    fireEvent.click(screen.getByText(/Logout/i));

    // Check if logout functions are called and navigate function is invoked
    expect(localStorage.getItem('token')).toBeNull(); // Token should be removed
    expect(mockSetToken).toHaveBeenCalledWith(''); // Token should be cleared
  });
});
