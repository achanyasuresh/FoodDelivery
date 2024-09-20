// Footer.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './Footer';

describe('Footer Component', () => {
  test('renders Footer component with all sections', () => {
    render(<Footer />);

    // Check if the main heading and subheading are rendered
    expect(screen.getByText(/High-quality food delivery services with a focus on freshness and customer satisfaction./i)).toBeInTheDocument();

    // Check if the section headings are rendered
    expect(screen.getByText(/COMPANY/i)).toBeInTheDocument();
    expect(screen.getByText(/GET IN TOUCH/i)).toBeInTheDocument();

    // Check if the list items are present in the COMPANY section
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();

    // Check if contact information is present
    expect(screen.getByText(/\+64 22622920/i)).toBeInTheDocument();
    expect(screen.getByText(/contact@foodie.com/i)).toBeInTheDocument();

    // Check for copyright text
    expect(screen.getByText(/Copyright 2024 @ Foodie - All rights reserved/i)).toBeInTheDocument();
  });

  test('renders social media icons', () => {
    render(<Footer />);

    // Check if social media icons are rendered
    expect(screen.getByTestId('facebook-icon')).toBeInTheDocument();
    expect(screen.getByTestId('twitter-icon')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
  });

  test('renders Footer component with correct structure', () => {
    const { container } = render(<Footer />);

    // Check if the footer has the correct structure
    expect(container.querySelector('.footer')).toBeInTheDocument();
    expect(container.querySelector('.footer-content')).toBeInTheDocument();
    expect(container.querySelector('.footer-left')).toBeInTheDocument();
    expect(container.querySelector('.footer-center')).toBeInTheDocument();
    expect(container.querySelector('.footer-right')).toBeInTheDocument();
    expect(container.querySelector('.footer-copyright')).toBeInTheDocument();
  });
});
