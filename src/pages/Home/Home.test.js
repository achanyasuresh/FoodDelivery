import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

// Mock the child components
jest.mock('../../components/Header/Header', () => () => <div>Header</div>);
jest.mock('../../components/Menu/Menu', () => ({ category, setCategory }) => (
  <div>
    <div>Menu - {category}</div>
    <button onClick={() => setCategory('NewCategory')}>Change Category</button>
  </div>
));
jest.mock('../../components/FoodDisplay/FoodDisplay', () => ({ category }) => (
  <div>FoodDisplay - {category}</div>
));

test('renders Home component with Header, Menu, and FoodDisplay', () => {
  const { getByText } = render(<Home />);

  // Check if Header component is rendered
  expect(getByText('Header')).toBeInTheDocument();

  // Check if Menu component is rendered
  expect(getByText('Menu - All')).toBeInTheDocument(); // Default category is "All"

  // Check if FoodDisplay component is rendered
  expect(getByText('FoodDisplay - All')).toBeInTheDocument(); // Default category is "All"
});
