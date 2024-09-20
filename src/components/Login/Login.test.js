// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import Login from './Login';
// import { storeContext } from '../../data/storeContext';

// // Mock context values
// const mockSetToken = jest.fn();
// const mockSetShowLogin = jest.fn();

// const mockContextValue = {
//   url: 'http://localhost:5000',
//   setToken: mockSetToken,
// };

// const renderWithContext = () => {
//   render(
//     <storeContext.Provider value={mockContextValue}>
//       <Login setShowLogin={mockSetShowLogin} />
//     </storeContext.Provider>
//   );
// };

// describe('Login Component', () => {
//   test('renders Login form with initial state', () => {
//     renderWithContext();

//     // Check if the component renders with the initial "Login" state
//     expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
//   });

 
// });
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';
import { storeContext } from '../../data/storeContext';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Mock context values
const mockSetToken = jest.fn();
const mockSetShowLogin = jest.fn();

const mockContextValue = {
  url: 'http://localhost:5000',
  setToken: mockSetToken,
};

// Setup a mock for axios
const mockAxios = new MockAdapter(axios);

const renderWithContext = () => {
  render(
    <storeContext.Provider value={mockContextValue}>
      <Login setShowLogin={mockSetShowLogin} />
    </storeContext.Provider>
  );
};

describe('Login Component', () => {
  test('renders Login form with initial state', () => {
    renderWithContext();

    // Check if the component renders with the initial "Login" state
    expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });
  test('handles form submission for login', async () => {
    renderWithContext();

    // Mock the response for login
    mockAxios.onPost('/api/user/login').reply(200, {
      success: true,
      token: 'fake-token',
    });

    // Fill in the form and submit
    fireEvent.change(screen.getByPlaceholderText('Your email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('heading', { name: /Login/i }));

    // Wait for the async operation
   
  });

  test('handles form submission for sign up', async () => {
    renderWithContext();

    // Switch to Sign Up state
    // fireEvent.click(screen.getByText('Create a new account? Click here'));

    // Mock the response for sign up
    mockAxios.onPost('/api/user/register').reply(200, {
      success: true,
      token: 'fake-token',
    });

    // Fill in the form and submit
    fireEvent.change(screen.getByPlaceholderText('Your email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Wait for the async operation
 
  });

  test('shows an error message on failed form submission', async () => {
    renderWithContext();

    // Mock the response for failed login
    mockAxios.onPost('/api/user/login').reply(400, {
      success: false,
      message: 'Invalid credentials',
    });

    // Fill in the form and submit
    fireEvent.change(screen.getByPlaceholderText('Your email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('heading', { name: /Login/i }));

    // Wait for the alert
  
  });

  test('closes login form when clear icon is clicked', () => {
    renderWithContext();

    // Click the clear icon
    fireEvent.click(screen.getByTestId('ClearOutlinedIcon'));

    // Check if the setShowLogin function was called
    expect(mockSetShowLogin).toHaveBeenCalledWith(false);
  });
});
