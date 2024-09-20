import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

describe('Header Component', () => {
  test('renders header with correct content', () => {
    render(<Header />);

    // Check if the header title is present
    expect(screen.getByText(/Order your favourite food here/i)).toBeInTheDocument();
    
    // Check if the description text is present
    expect(screen.getByText(/Choose your food from here/i)).toBeInTheDocument();
    
    // Check if the "View Menu" button is present
    expect(screen.getByText(/View Menu/i)).toBeInTheDocument();
  });
});
